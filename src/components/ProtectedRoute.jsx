// Manejo de seguridad en rutas.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, isAuthenticated } = useAuth();

  // 1. Si no está autenticado, ir al Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si requiere rol admin y el usuario no lo es
  if (roleRequired === 'admin' && user.role !== 'admin') {
    alert("No tiene permiso de Administrador");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
