"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Paperclip, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (urls: string[]) => void;
  onRemoveFile: (url: string) => void;
  fileUrls: string[];
  isLoading: boolean;
}

export function ChatInput({
  onSendMessage,
  onFileUpload,
  onRemoveFile,
  fileUrls,
  isLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Max size is 10MB.`);
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      onFileUpload(urls);

      toast({
        title: "Success",
        description: `${files.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* File previews */}
      {fileUrls.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-lg">
          {fileUrls.map((url, index) => {
            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
            return (
              <div key={index} className="relative group">
                {isImage ? (
                  <div className="relative w-20 h-20 rounded overflow-hidden border border-gray-300">
                    <Image
                      src={url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded border border-gray-300 flex items-center justify-center bg-white">
                    <Paperclip className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <button
                  onClick={() => onRemoveFile(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 bg-[#2f2f2f] rounded-[26px] shadow-lg">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || isUploading}
          className="shrink-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg h-8 w-8 p-0"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </Button>

        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything"
          className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 text-sm py-2 text-white placeholder-gray-500"
          minRows={1}
          maxRows={6}
          disabled={isLoading}
        />

        {/* Show microphone/speaker when empty, send button when text is present */}
        {!message.trim() ? (
          <>
            <button className="shrink-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1.5 h-8 w-8">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <button className="shrink-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1.5 h-8 w-8">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="shrink-0 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
