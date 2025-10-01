/**
 * Mem0 AI Integration for Enhanced Memory
 *
 * This module provides integration with Mem0 AI for advanced conversation memory.
 * Mem0 provides context-aware memory that can remember user preferences,
 * conversation history, and provide more personalized responses.
 *
 * To use this feature:
 * 1. Sign up at https://mem0.ai
 * 2. Get your API key
 * 3. Add MEM0_API_KEY to your .env file
 * 4. Uncomment the integration in the chat API route
 */

interface Mem0Config {
  apiKey: string;
  userId: string;
  organizationId?: string;
}

interface Memory {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

class Mem0Client {
  private apiKey: string;
  private baseUrl = "https://api.mem0.ai/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async addMemory(
    userId: string,
    content: string,
    metadata?: Record<string, unknown>
  ): Promise<Memory> {
    const response = await fetch(`${this.baseUrl}/memories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        content,
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add memory: ${response.statusText}`);
    }

    return response.json();
  }

  async getMemories(userId: string): Promise<Memory[]> {
    const response = await fetch(`${this.baseUrl}/memories?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get memories: ${response.statusText}`);
    }

    return response.json();
  }

  async searchMemories(
    userId: string,
    query: string,
    limit: number = 5
  ): Promise<Memory[]> {
    const response = await fetch(`${this.baseUrl}/memories/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        query,
        limit,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to search memories: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteMemory(memoryId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/memories/${memoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete memory: ${response.statusText}`);
    }
  }
}

// Export singleton instance
let mem0Client: Mem0Client | null = null;

export function getMem0Client(): Mem0Client | null {
  if (!process.env.MEM0_API_KEY) {
    console.warn("MEM0_API_KEY not configured. Memory features disabled.");
    return null;
  }

  if (!mem0Client) {
    mem0Client = new Mem0Client(process.env.MEM0_API_KEY);
  }

  return mem0Client;
}

/**
 * Add conversation context to memory
 */
export async function addConversationMemory(
  userId: string,
  conversationId: string,
  content: string
): Promise<void> {
  const client = getMem0Client();
  if (!client) return;

  try {
    await client.addMemory(userId, content, {
      conversation_id: conversationId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to add conversation memory:", error);
  }
}

/**
 * Get relevant memories for current conversation
 */
export async function getRelevantMemories(
  userId: string,
  query: string,
  limit: number = 5
): Promise<string[]> {
  const client = getMem0Client();
  if (!client) return [];

  try {
    const memories = await client.searchMemories(userId, query, limit);
    return memories.map((m) => m.content);
  } catch (error) {
    console.error("Failed to get relevant memories:", error);
    return [];
  }
}

/**
 * Example usage in chat API:
 *
 * import { getRelevantMemories, addConversationMemory } from '@/lib/mem0-integration';
 *
 * // In your chat API route:
 * const memories = await getRelevantMemories(userId, userMessage);
 * const contextMessage = memories.length > 0
 *   ? `Relevant context from previous conversations: ${memories.join('. ')}`
 *   : '';
 *
 * // Add to system message or prepend to conversation
 *
 * // After getting AI response, save to memory:
 * await addConversationMemory(userId, conversationId, userMessage);
 */

export default getMem0Client;
