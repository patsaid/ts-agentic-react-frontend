import axios from 'axios';

interface ImportMetaEnv {
  VITE_API_URL?: string;
}

// Augment the global ImportMeta interface for TypeScript
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_URL = import.meta.env.VITE_API_URL;

export async function askAgent(question: string): Promise<string> {
  const res = await axios.post<{ answer: string }>(`${API_URL}/agent/ask`, { question });
  return res.data.answer;
}
