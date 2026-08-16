# Taskflow — Task Tracker

A polished, secure MERN task manager built for personal productivity and portfolio use. Users can register, sign in, and manage only their own tasks with due dates, priorities, search, filtering, sorting, and completion tracking.

## Features

- JWT authentication with bcrypt password hashing and persisted sessions
- Full task CRUD, completion toggle, ownership protection, and validation
- Search by title/description, status and priority filters, and multiple sorting options
- Live task statistics, overdue indicators, confirmation before deletion, responsive dashboard, and feedback states
- MongoDB Atlas, Render, and Vercel-ready environment-based configuration

## Stack and architecture

React + Vite, React Router, Axios | Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs.

`client/` is the React UI. `server/` contains routes, controllers, Mongoose models, middleware, and utility functions. REST endpoints live under `/api`.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Current authenticated user |
| GET/POST | `/api/tasks` | List/create user tasks |
| GET/PUT/DELETE | `/api/tasks/:id` | Read, update, delete a task |
| PATCH | `/api/tasks/:id/status` | Change task status |
| GET | `/api/health` | Service health check |

## Local setup

```bash
npm install
cd client && npm install && cd ..
cp .env.example .env
cp client/.env.example client/.env
```

Set these values in `.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_or_local_connection_string
JWT_SECRET=use_a_long_random_secret
CLIENT_URL=http://localhost:5175
```

Set `VITE_API_URL=http://localhost:5001/api` in `client/.env`.

Run both applications with `npm run dev`, or separately with `npm run dev:server` and `npm run client`. Build the frontend with `npm run build`.

## Deployment

Deploy `server/` through the root repository on Render using `npm run server` and configure `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` (your Vercel URL). Deploy `client/` to Vercel with root directory `client`, build command `npm run build`, output `dist`, and `VITE_API_URL` pointing to the Render API URL plus `/api`.

## Screenshots

Add dashboard and auth screenshots here when publishing the repository.

## Future improvements

Task categories, recurring tasks, email reminders, tests with an in-memory MongoDB instance, and account settings.
