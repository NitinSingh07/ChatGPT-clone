/**
 * Global TypeScript Type Definitions
 *
 * This file contains shared type definitions used across the application.
 */

import { ObjectId } from "mongodb";

// ============================================
// Database Types
// ============================================

export interface Message {
  _id?: ObjectId;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  fileUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
  isEdited?: boolean;
}

export interface Conversation {
  _id?: ObjectId;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

// ============================================
// API Types
// ============================================

export interface ChatRequest {
  messages: ChatMessage[];
  conversationId?: string;
  userId: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface UploadResponse {
  url: string;
  publicId: string;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// ============================================
// Component Props Types
// ============================================

export interface ChatInterfaceProps {
  initialConversations?: Conversation[];
}

export interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ChatAreaProps {
  conversationId: string | null;
  onConversationCreated: (id: string) => void;
  onToggleSidebar: () => void;
}

export interface ChatMessageProps {
  message: ChatMessage & { id: string };
  fileUrls?: string[];
  isEdited?: boolean;
  onEdit?: (content: string) => void;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (urls: string[]) => void;
  onRemoveFile: (url: string) => void;
  fileUrls: string[];
  isLoading: boolean;
}

// ============================================
// Utility Types
// ============================================

export type ConversationWithMessages = Conversation & {
  messages: Message[];
};

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};

// ============================================
// Configuration Types
// ============================================

export interface ModelConfig {
  name: string;
  maxTokens: number;
  temperature: number;
  contextWindow: number;
}

export const GPT_4_TURBO: ModelConfig = {
  name: "gpt-4-turbo-preview",
  maxTokens: 4096,
  temperature: 0.7,
  contextWindow: 128000,
};

export const GPT_35_TURBO: ModelConfig = {
  name: "gpt-3.5-turbo",
  maxTokens: 4096,
  temperature: 0.7,
  contextWindow: 16385,
};

// ============================================
// Environment Types
// ============================================

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Clerk
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;

      // OpenAI
      OPENAI_API_KEY: string;

      // MongoDB
      MONGODB_URI: string;

      // Cloudinary
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;

      // Uploadcare (optional)
      NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY?: string;

      // Mem0 (optional)
      MEM0_API_KEY?: string;

      // App
      NEXT_PUBLIC_APP_URL: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
