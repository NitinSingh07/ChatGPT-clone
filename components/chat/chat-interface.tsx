"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Sidebar } from "./sidebar";
import { ChatArea } from "./chat-area";
import { getConversations } from "@/lib/db-helpers";
import type { Conversation } from "@/lib/db-helpers";

export function ChatInterface() {
  const { user } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  const loadConversations = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/conversations?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        // Set initial conversation if none is selected
        if (!currentConversationId && data.length > 0) {
          setCurrentConversationId(data[0]._id.toString());
        }
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const handleNewConversation = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat", userId: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentConversationId(data.conversationId);
        loadConversations(); // Reload conversations to show the new one
      } else {
        console.error("Failed to create new conversation");
      }
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
      });
      setConversations(
        conversations.filter((c) => c._id?.toString() !== conversationId)
      );
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#212121]">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <ChatArea
        conversationId={currentConversationId}
        onConversationCreated={(id) => {
          setCurrentConversationId(id);
          loadConversations();
        }}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
}
