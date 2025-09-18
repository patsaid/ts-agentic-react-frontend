import React, { useState } from 'react';

export type Message = { question: string; answer: string };
export type Conversation = { _id: string; messages: Message[] };

interface ConversationContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversationId: string | null;
  setActiveConversationId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ConversationContext = React.createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  return (
    <ConversationContext.Provider value={{ conversations, setConversations, activeConversationId, setActiveConversationId }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const ctx = React.useContext(ConversationContext);
  if (!ctx) throw new Error('useConversation must be used within ConversationProvider');
  return ctx;
};
