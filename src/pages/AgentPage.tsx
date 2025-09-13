import React, { useState } from 'react';
import { askAgent } from '../api/agent-api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AgentPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await askAgent(question);
      setAnswer(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Ask the Agent</h1>

      <form onSubmit={handleAsk} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '0.5rem',
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Ask
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {answer && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
