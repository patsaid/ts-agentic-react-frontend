import React, { useState, useContext } from 'react';
import { askAgent } from '../api/agent-api';
import { AuthContext } from '../context/AuthContext';
import { useConversation } from '../context/ConversationContext';

export default function Agent() {
  const { user, isSignedIn } = useContext(AuthContext)!; // ✅ useContext directly
  const { conversations, setConversations, activeConversationId, setActiveConversationId } = useConversation();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isSignedIn || !user) return <p>Please sign in to chat with the agent.</p>;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await askAgent(user._id, question, activeConversationId ?? undefined);
      const newMessage = { question, answer: res.answer };

      let updatedConversations = [...conversations];

      if (activeConversationId) {
        updatedConversations = updatedConversations.map((c) =>
          c._id === activeConversationId ? { ...c, messages: [...c.messages, newMessage] } : c
        );
      } else {
        const newConversation = { _id: res.conversationId, messages: [newMessage] };
        updatedConversations.unshift(newConversation);
        setActiveConversationId(res.conversationId);
      }

      setConversations(updatedConversations);
      setQuestion('');
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const activeConversation = conversations.find(c => c._id === activeConversationId);

  return (
    <div style={{ padding: '1rem', flex: 1 }}>
      <h2>Agent Chat</h2>

      <form onSubmit={handleAsk} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Ask'}</button>
      </form>

      {!activeConversation && <p>Select a conversation or start a new one.</p>}

      {activeConversation?.messages.map((m, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <strong>Q:</strong> {m.question}
          <br />
          <strong>A:</strong> {m.answer}
        </div>
      ))}
    </div>
  );
}
