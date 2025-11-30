//Maneja la autenticación, roles y mensajes de sesión.

import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Objeto usuario { name, role }
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (username, isAdmin) => {
    const role = isAdmin ? 'admin' : 'user';
    setUser({ name: username, role });
    alert(`Sesión Iniciada por ${isAdmin ? 'Admin' : 'Usuario'}: ${username}`);
    navigate('/productos'); // Redirigir a productos tras login
  };

  // Función para cerrar sesión
  const logout = (clearCartCallback) => {
    // Requerimiento: Mensaje y vaciar carrito
    alert("Se eliminarán del carrito todos los productos seleccionados");
    if(clearCartCallback) clearCartCallback(); // Callback para limpiar carrito
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};