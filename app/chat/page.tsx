import { Suspense } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatSkeleton } from "@/components/chat/chat-skeleton";

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatInterface />
    </Suspense>
  );
}
