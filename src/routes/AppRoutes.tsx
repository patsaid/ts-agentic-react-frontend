import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import Users from '../pages/UsersPage';
import Agent from '../pages/AgentPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/agent" element={<Agent />} />
    </Routes>
  );
}
