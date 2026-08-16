require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const origins = (process.env.CLIENT_URL || 'http://localhost:5175').split(',').map((url) => url.trim());
app.use(cors({ origin(origin, callback) { if (!origin || origins.includes(origin)) return callback(null, true); return callback(new Error('CORS origin not allowed')); }, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;
connectDatabase().then(() => app.listen(port, () => console.log(`API listening on port ${port}`))).catch((error) => { console.error(`Database connection failed: ${error.message}`); process.exit(1); });
