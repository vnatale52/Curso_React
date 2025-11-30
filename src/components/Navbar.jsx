//Navegación responsiva.

import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();

  // Calcular cantidad total de items sumando las cantidades de cada producto
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout(clearCart); // Pasamos clearCart como callback para vaciar el carrito al salir
  };

  return (
    // Agregamos 'fixed-top' para mantenerla fija y 'shadow' para el diseño
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">Bottega di Vincenzo</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Menú Izquierdo */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contacto</NavLink>
            </li>
            
            {/* Solo mostramos el panel Admin si el usuario tiene rol 'admin' */}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link text-warning fw-bold" to="/admin">
                  <i className="bi bi-shield-lock-fill me-1"></i>Admin
                </NavLink>
              </li>
            )}
          </ul>
          
          {/* Menú Derecho (Carrito y Usuario) */}
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* Botón de Carrito */}
            <li className="nav-item me-3">
               <NavLink to="/carrito" className="btn btn-secondary position-relative">
                  <i className="bi bi-cart-fill me-1"></i> Carrito
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                      <span className="visually-hidden">productos en carrito</span>
                    </span>
                  )}
               </NavLink>
            </li>
            
            {/* Estado de Autenticación */}
            {user ? (
              <>
                <li className="nav-item me-3 text-light d-flex align-items-center">
                  <i className="bi bi-person-circle me-2"></i>
                  <span className="d-none d-lg-inline">Hola, <strong>{user.name}</strong></span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-light btn-sm fw-bold text-primary">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;