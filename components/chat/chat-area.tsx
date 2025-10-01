"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useChat } from "ai/react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { getMessages, createConversation } from "@/lib/db-helpers";
import type { Message as DBMessage } from "@/lib/db-helpers";
import { generateConversationTitle } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ChatAreaProps {
  conversationId: string | null;
  onConversationCreated: (id: string) => void;
  onToggleSidebar: () => void;
}

export function ChatArea({
  conversationId,
  onConversationCreated,
  onToggleSidebar,
}: ChatAreaProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);

  const {
    messages: chatMessages,
    append,
    setMessages: setChatMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      conversationId,
      userId: user?.id,
    },
    onFinish: async (message) => {
      // Save assistant message to database
      if (conversationId) {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            role: "assistant",
            content: message.content,
          }),
        });
        loadMessages();
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (conversationId) {
      loadMessages();
    } else {
      setMessages([]);
      setChatMessages([]);
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, messages]);

  const loadMessages = async () => {
    if (!conversationId) return;

    try {
      const response = await fetch(
        `/api/messages?conversationId=${conversationId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setChatMessages(
          data.map((msg: DBMessage) => ({
            id: msg._id?.toString() || "",
            role: msg.role,
            content: msg.content,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!user?.id || !content.trim()) return;

    setIsLoading(true);

    try {
      let activeConversationId = conversationId;

      // Create new conversation if doesn't exist
      if (!activeConversationId) {
        const title = generateConversationTitle(content);
        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            title,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          activeConversationId = data.conversationId;
          if (activeConversationId) {
            onConversationCreated(activeConversationId);
          }
        }
      }

      // Save user message to database
      if (activeConversationId) {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: activeConversationId,
            role: "user",
            content,
            fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
          }),
        });
      }

      // Send message to AI
      await append({
        role: "user",
        content,
      });

      setFileUrls([]);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (urls: string[]) => {
    setFileUrls((prev) => [...prev, ...urls]);
  };

  const handleRemoveFile = (url: string) => {
    setFileUrls((prev) => prev.filter((u) => u !== url));
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      // Update message in database
      await fetch(`/api/messages/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });

      // Delete messages after this one
      await fetch(`/api/messages/${messageId}/after`, {
        method: "DELETE",
      });

      // Reload and regenerate
      await loadMessages();
      await append({
        role: "user",
        content: newContent,
      });
    } catch (error) {
      console.error("Failed to edit message:", error);
      toast({
        title: "Error",
        description: "Failed to edit message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#212121]">
      {/* Header */}
      <header className="h-12 flex items-center  px-4 relative">
        {/* Center - ChatGPT Dropdown */}
        <span className="text-white font-normal text-lg">ChatGPT</span>
        <svg
          className="w-3 h-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-normal mb-2 text-white">
                Where should we begin?
              </h2>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {chatMessages.map((message, index) => {
              const dbMessage = messages.find(
                (m) => m._id?.toString() === message.id
              );
              return (
                <div
                  key={message.id || index}
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-4xl">
                    <ChatMessage
                      message={message}
                      fileUrls={dbMessage?.fileUrls}
                      isEdited={dbMessage?.isEdited}
                      onEdit={
                        message.role === "user"
                          ? (content) => handleEditMessage(message.id, content)
                          : undefined
                      }
                    />
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-[#212121]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            onRemoveFile={handleRemoveFile}
            fileUrls={fileUrls}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
