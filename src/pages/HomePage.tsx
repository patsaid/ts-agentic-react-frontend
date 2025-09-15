import React from 'react';
import Agent from '../components/Agent';
import '../styles/global.css';

type Conversation = {
  id: number;
  messages: { question: string; answer: string }[];
};

type HomePageProps = {
  conversations: Conversation[];
  activeConversationId: number;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

export default function HomePage({
  conversations,
  activeConversationId,
  setConversations,
}: HomePageProps) {
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const handleNewAnswer = (question: string, answer: string) => {
    if (!activeConversation) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, messages: [...c.messages, { question, answer }] }
          : c
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {activeConversation ? (
        <Agent
          conversation={activeConversation}
          onAnswer={handleNewAnswer}
        />
      ) : (
        <p>No conversation selected.</p>
      )}
    </div>
  );
}
