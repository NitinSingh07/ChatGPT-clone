import { getDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

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

// Conversations
export async function createConversation(
  userId: string,
  title: string
): Promise<string> {
  const db = await getDatabase();
  const result = await db.collection<Conversation>("conversations").insertOne({
    userId,
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastMessageAt: new Date(),
  });
  return result.insertedId.toString();
}

export async function getConversations(
  userId: string
): Promise<Conversation[]> {
  const db = await getDatabase();
  return db
    .collection<Conversation>("conversations")
    .find({ userId })
    .sort({ lastMessageAt: -1 })
    .toArray();
}

export async function getConversation(
  conversationId: string
): Promise<Conversation | null> {
  const db = await getDatabase();
  return db
    .collection<Conversation>("conversations")
    .findOne({ _id: new ObjectId(conversationId) });
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
): Promise<void> {
  const db = await getDatabase();
  await db.collection<Conversation>("conversations").updateOne(
    { _id: new ObjectId(conversationId) },
    {
      $set: {
        title,
        updatedAt: new Date(),
      },
    }
  );
}

export async function deleteConversation(
  conversationId: string
): Promise<void> {
  const db = await getDatabase();
  await db
    .collection<Conversation>("conversations")
    .deleteOne({ _id: new ObjectId(conversationId) });
  await db.collection<Message>("messages").deleteMany({ conversationId });
}

export async function updateConversationLastMessage(
  conversationId: string
): Promise<void> {
  const db = await getDatabase();
  await db.collection<Conversation>("conversations").updateOne(
    { _id: new ObjectId(conversationId) },
    {
      $set: {
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    }
  );
}

// Messages
export async function createMessage(
  message: Omit<Message, "_id">
): Promise<string> {
  const db = await getDatabase();
  const result = await db.collection<Message>("messages").insertOne(message);

  // Update conversation last message time
  await updateConversationLastMessage(message.conversationId);

  return result.insertedId.toString();
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const db = await getDatabase();
  return db
    .collection<Message>("messages")
    .find({ conversationId })
    .sort({ createdAt: 1 })
    .toArray();
}

export async function updateMessage(
  messageId: string,
  content: string
): Promise<void> {
  const db = await getDatabase();
  await db.collection<Message>("messages").updateOne(
    { _id: new ObjectId(messageId) },
    {
      $set: {
        content,
        updatedAt: new Date(),
        isEdited: true,
      },
    }
  );
}

export async function deleteMessage(messageId: string): Promise<void> {
  const db = await getDatabase();
  await db.collection<Message>("messages").deleteOne({
    _id: new ObjectId(messageId),
  });
}

export async function deleteMessagesAfter(
  conversationId: string,
  messageId: string
): Promise<void> {
  const db = await getDatabase();
  const message = await db
    .collection<Message>("messages")
    .findOne({ _id: new ObjectId(messageId) });

  if (message) {
    await db.collection<Message>("messages").deleteMany({
      conversationId,
      createdAt: { $gte: message.createdAt },
    });
  }
}
