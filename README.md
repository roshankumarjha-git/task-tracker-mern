# TaskFlow — MERN Task Tracker

A full-stack task management application built with the MERN stack. TaskFlow lets users securely manage their own tasks with authentication, priorities, statuses, due dates, search, filtering, sorting, and completion tracking.

## Live Demo

🌐 **Live Website:** https://task-tracker-mern-liart.vercel.app/

💻 **GitHub:** https://github.com/roshankumarjha-git/task-tracker-mern

⚙️ **Backend API:** https://task-tracker-mern-3tox.onrender.com

> For the best experience, use TaskFlow on a laptop or PC.

## Features

- User registration and login
- JWT authentication with bcrypt password hashing
- Persistent login sessions
- Create, edit, delete, and complete tasks
- Task priorities and statuses
- Due dates and overdue indicators
- Search by title or description
- Filter by status and priority
- Multiple sorting options
- Live dashboard statistics
- User-specific task ownership protection
- Responsive dashboard
- Confirmation before deleting tasks
- API health endpoint
- Persistent data using MongoDB Atlas

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Deployment
- Vercel — Frontend
- Render — Backend/API
- MongoDB Atlas — Database

## Architecture

```text
                 ┌─────────────────────┐
                 │       Vercel        │
                 │   React + Vite UI   │
                 └──────────┬──────────┘
                            │
                            │ REST API
                            ▼
                 ┌─────────────────────┐
                 │       Render        │
                 │  Node + Express API │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   MongoDB Atlas     │
                 │      Database       │
                 └─────────────────────┘
```

The `client/` directory contains the React frontend, while `server/` contains the Express API, routes, controllers, models, middleware, and utility functions.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get current authenticated user |
| GET | `/api/tasks` | Get user's tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get a specific task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| GET | `/api/health` | Check API health |

## Project Structure

```text
task-tracker-mern/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── docs/
│   └── dashboard.png
│
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/roshankumarjha-git/task-tracker-mern.git
cd task-tracker-mern
```

Install dependencies:

```bash
npm install
cd client && npm install && cd ..
```

Create the environment files:

```bash
cp .env.example .env
cp client/.env.example client/.env
```

Configure the backend `.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5175
```

Configure `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:server
npm run client
```

Frontend:

```text
http://localhost:5175
```

Backend:

```text
http://localhost:5001
```

Build the frontend:

```bash
npm run build
```

## Deployment

### Backend — Render

The backend is deployed on Render.

Start command:

```bash
node server/server.js
```

Required environment variables:

```text
MONGO_URI
JWT_SECRET
CLIENT_URL
```

`CLIENT_URL` should point to the deployed Vercel frontend.

### Frontend — Vercel

The React frontend is deployed on Vercel.

The root-level `vercel.json` handles the monorepo setup by installing the frontend dependencies, building the Vite application, and publishing `client/dist`.

Production API configuration:

```env
VITE_API_URL=https://task-tracker-mern-3tox.onrender.com/api
```

## Future Improvements

- Task categories
- Recurring tasks
- Email reminders
- Automated testing
- Account settings
- Additional productivity features

## Author

**Roshan Kumar Jha**

Built while learning full-stack web development and experimenting with prompt-assisted development and debugging.
