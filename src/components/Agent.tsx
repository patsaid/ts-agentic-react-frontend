import React, { useState } from 'react';
import { askAgent } from '../api/agent-api';
import LoadingSpinner from './LoadingSpinner';
import '../styles/global.css';

type AgentProps = {
  onAnswer: (question: string, answer: string) => void;
};

export default function Agent({ onAnswer }: AgentProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await askAgent(question);
      onAnswer(question, result); // pass conversation to parent
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div>
      <h1>Ask the Agent</h1>
      <form onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Ask</button>
      </form>

      {loading && <LoadingSpinner />}
    </div>
  );
}
