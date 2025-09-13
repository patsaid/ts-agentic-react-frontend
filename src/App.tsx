import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/agent">Agent</Link>
        </nav>

        <main className="app-container">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
