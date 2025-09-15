import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

type Conversation = {
  id: number;
  messages: { question: string; answer: string }[];
};

type SidebarProps = {
  conversations: Conversation[];
  onSelectConversation: (id: number) => void;
  activeConversationId: number;
};

export default function Sidebar({
  conversations,
  onSelectConversation,
  activeConversationId,
}: SidebarProps) {
  const auth = useContext(AuthContext);
  const isSignedIn = auth?.isSignedIn ?? false;

  if (!isSignedIn) return null;

  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h2>Conversations</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {conversations.map((c) => (
          <li
            key={c.id}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
              backgroundColor: c.id === activeConversationId ? '#e0e0e0' : 'transparent',
              borderRadius: '4px',
            }}
            onClick={() => onSelectConversation(c.id)}
          >
            {c.messages[0]?.question || `Conversation ${c.id}`}
          </li>
        ))}
      </ul>
    </aside>
  );
}
