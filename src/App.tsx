import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';
import { ConversationProvider } from './context/ConversationContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <ConversationProvider>
            <div style={{ display: 'flex', flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1, padding: '1rem' }}>
                <AppRoutes />
              </main>
            </div>
          </ConversationProvider>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
