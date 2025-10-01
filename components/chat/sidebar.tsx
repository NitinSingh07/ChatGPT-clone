"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Plus, MessageSquare, Trash2, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Conversation } from "@/lib/db-helpers";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onToggle,
}: SidebarProps) {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    await onDeleteConversation(id);
    setDeletingId(null);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-accent md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onToggle}
      />

      {/* Sidebar */}
      <aside className="fixed md:relative inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-border bg-background">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <span className="font-semibold">ChatGPT Clone</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={onNewConversation}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No conversations yet.
                <br />
                Start a new chat!
              </div>
            ) : (
              conversations.map((conversation) => {
                const conversationId = conversation._id?.toString() || "";
                const isActive = currentConversationId === conversationId;

                return (
                  <div
                    key={conversationId}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    )}
                    onClick={() => onSelectConversation(conversationId)}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(new Date(conversation.lastMessageAt))}
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleDelete(conversationId, e)}
                            disabled={deletingId === conversationId}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete conversation</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm truncate max-w-[120px]">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
