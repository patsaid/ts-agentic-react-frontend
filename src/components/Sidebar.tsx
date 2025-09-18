import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 
import { useConversation } from '../context/ConversationContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function Sidebar() {
  const { user, isSignedIn } = useContext(AuthContext)!;
  const { conversations, setConversations, activeConversationId, setActiveConversationId } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user?._id) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${API_URL}/agent/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.error('Failed to fetch conversations:', err);
      }
    };

    fetchConversations();
  }, [isSignedIn, user?._id, setConversations]);

  const handleNewConversation = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await axios.post<{ conversationId: string }>(
        `${API_URL}/agent/conversations/new`,
        { userId: user._id }
      );
      const newConversation = { _id: res.data.conversationId, messages: [] };
      setConversations([newConversation, ...(conversations || [])]);
      setActiveConversationId(res.data.conversationId);
    } catch (err) {
      console.error('Failed to create new conversation:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) return null;

  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h2>Conversations</h2>
      <button onClick={handleNewConversation} disabled={loading}>
        {loading ? 'Creating...' : 'Start New Conversation'}
      </button>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {conversations?.map((c) => (
          <li
            key={c._id}
            onClick={() => setActiveConversationId(c._id)}
            style={{
              cursor: 'pointer',
              fontWeight: c._id === activeConversationId ? 'bold' : 'normal',
              padding: '0.25rem 0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            title={c.messages[0]?.question || 'New Conversation'}
          >
            {(c.messages[0]?.question || 'New Conversation').slice(0, 100)}
          </li>
        ))}
      </ul>
    </aside>
  );
}
