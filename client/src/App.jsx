import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function DashboardLayout() {
  return <><Dashboard /><Footer /></>;
}

function Guard({ children }) {
  const { user, loading } = useAuth();
  return loading ? <div className="center">Loading your workspace…</div> : user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes><Route path="/" element={<Guard><DashboardLayout /></Guard>} /><Route path="/login" element={<AuthPage login />} /><Route path="/register" element={<AuthPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
