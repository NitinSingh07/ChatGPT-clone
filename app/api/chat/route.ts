import { auth } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getMessages } from "@/lib/db-helpers";

// Using Groq via OpenAI-compatible API (free tier, fast AI)
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages, conversationId } = await req.json();

    // Load conversation history if conversationId is provided
    let conversationMessages = messages;

    if (conversationId) {
      const dbMessages = await getMessages(conversationId);
      conversationMessages = dbMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      conversationMessages.push(messages[messages.length - 1]);
    }

    // Limit to last 20 messages
    const maxMessages = 20;
    const limitedMessages = conversationMessages.slice(-maxMessages);

    // System message
    const systemMessage = {
      role: "system" as const,
      content:
        "You are a helpful, friendly, and knowledgeable AI assistant. Provide clear, accurate, and engaging responses. Format your responses using markdown when appropriate.",
    };

    // Create Groq streaming completion via OpenAI-compatible API
    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [systemMessage, ...limitedMessages],
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    });

    // Use OpenAIStream adapter - compatible with useChat hook
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
