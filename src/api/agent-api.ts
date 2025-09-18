import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface ConversationMessage {
  question: string;
  answer: string;
}

export interface Conversation {
  _id: string;
  user: string;
  summary: string;
  messages: ConversationMessage[];
  createdAt: string;
}

/**
 * Start a new conversation
 */
export async function startConversation(userId: string): Promise<{ conversationId: string }> {
  const res = await axios.post<{ conversationId: string }>(`${API_URL}/agent/conversations/new`, { userId });
  return res.data;
}

/**
 * Ask the agent a question (optionally link to existing conversation)
 */
export async function askAgent(
  userId: string,
  question: string,
  conversationId?: string
): Promise<{ answer: string; conversationId: string }> {
  const res = await axios.post<{ answer: string; conversationId: string }>(
    `${API_URL}/agent/ask`,
    { userId, question, conversationId }
  );
  return res.data;
}

/**
 * Get all conversations for a user
 */
export async function fetchConversations(userId: string): Promise<Conversation[]> {
  const res = await axios.get<Conversation[]>(`${API_URL}/agent/conversations/${userId}`);
  return res.data;
}

/**
 * Get weather info (agent persisted)
 */
export async function fetchWeather(userId: string, city: string): Promise<{ answer: string; conversationId: string }> {
  const res = await axios.post<{ answer: string; conversationId: string }>(`${API_URL}/agent/weather/${city}`, { userId });
  return res.data;
}

/**
 * Fetch local DB info (agent persisted)
 */
export async function fetchLocal(userId: string, name: string): Promise<{ answer: string; conversationId: string }> {
  const res = await axios.post<{ answer: string; conversationId: string }>(`${API_URL}/agent/local/${name}`, { userId });
  return res.data;
}
