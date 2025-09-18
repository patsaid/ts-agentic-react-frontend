import React from 'react';
import Sidebar from '../components/Sidebar';
import Agent from '../components/Agent';
import '../styles/global.css';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Agent />
      </main>
    </div>
  );
}
