import axios from 'axios';

// Use the deployed API when configured, with a local development fallback.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((c) => { const t = localStorage.getItem('task-tracker-token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });
export default api;
