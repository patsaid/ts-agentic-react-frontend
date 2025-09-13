# ts-agentic-react-frontend
# Agentic Frontend

A React + TypeScript frontend for the Agentic demo application. Connects to the backend API to manage users and interact with the AI agent.

---

## Features

- Pages:
  - Home
  - Users (create & list users)
  - Agent (ask questions)
- React Router for navigation
- API integration with Axios
- Loading states with spinner
- Global CSS styling
- Environment variable support
- Docker support

---

## Requirements

- Node.js >= 18
- npm
- Docker (optional)
- Backend running at `VITE_API_URL` (default: http://localhost:3000)

---

## Setup

1. Clone the repo:

```bash
git clone <repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a .env file:
```bash
VITE_API_URL=http://localhost:3000
```

## Docker
Build and run with Docker:
```bash
docker-compose up --build
```