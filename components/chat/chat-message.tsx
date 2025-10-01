"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bot, User, Edit2, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import type { Message } from "ai";

interface ChatMessageProps {
  message: Message;
  fileUrls?: string[];
  isEdited?: boolean;
  onEdit?: (content: string) => void;
}

export function ChatMessage({
  message,
  fileUrls,
  isEdited,
  onEdit,
}: ChatMessageProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleSaveEdit = () => {
    if (onEdit && editedContent.trim() !== message.content) {
      onEdit(editedContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 p-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } group hover:bg-gray-700/30`}
    >
      {/* Avatar */}
      <Avatar className="h-8 w-8 shrink-0">
        {isUser ? (
          <>
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-[#10a37f] text-white">
              {user?.firstName?.[0] ||
                user?.emailAddresses[0]?.emailAddress?.[0] ||
                "U"}
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-[#10a37f] text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </AvatarFallback>
        )}
      </Avatar>

      {/* Message Content */}
      <div
        className={`flex-1 space-y-2 ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-[#10a37f] text-white ml-auto max-w-[80%]"
              : "bg-gray-700 text-white max-w-full"
          }`}
        >
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[100px] resize-none"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={!editedContent.trim()}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* File attachments */}
              {fileUrls && fileUrls.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {fileUrls.map((url, index) => {
                    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
                    return isImage ? (
                      <div
                        key={index}
                        className="relative w-32 h-32 rounded-lg overflow-hidden border"
                      >
                        <Image
                          src={url}
                          alt="Attachment"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline hover:opacity-80"
                      >
                        Document {index + 1}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Message text */}
              {isUser ? (
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        {!isEditing && (
          <div className="flex items-center gap-2 px-2">
            {isEdited && (
              <span className="text-xs text-gray-400">(edited)</span>
            )}
            {isUser && onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-7 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
              >
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
