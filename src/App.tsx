import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';

type Conversation = {
  id: number;
  messages: { question: string; answer: string }[];
};

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, messages: [{ question: 'Hello', answer: 'Hi! How can I help you?' }] },
    { id: 2, messages: [{ question: 'How are you?', answer: 'I am fine, thanks!' }] },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<number>(1);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ display: 'flex', flex: 1 }}>
            {/* Sidebar completely independent */}
            <Sidebar
              conversations={conversations}
              onSelectConversation={setActiveConversationId}
              activeConversationId={activeConversationId}
            />

            {/* Main content */}
            <main style={{ flex: 1, padding: '1rem' }}>
              <AppRoutes
                conversations={conversations}
                activeConversationId={activeConversationId}
                setConversations={setConversations}
              />
            </main>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
