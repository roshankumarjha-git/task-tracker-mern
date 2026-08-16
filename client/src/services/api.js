import axios from 'axios';

// Keep every client request on the local Express API during development.
const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((c) => { const t = localStorage.getItem('task-tracker-token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });
export default api;
