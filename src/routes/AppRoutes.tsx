// AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Conversation } from '../App'; // import type if needed

type AppRoutesProps = {
  conversations: Conversation[];
  activeConversationId: number;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

export default function AppRoutes({
  conversations,
  activeConversationId,
  setConversations,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            conversations={conversations}
            activeConversationId={activeConversationId}
            setConversations={setConversations}
          />
        }
      />
    </Routes>
  );
}
