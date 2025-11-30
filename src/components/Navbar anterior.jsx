//Navegación responsiva.

import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();

  // Calcula cantidad total de items
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout(clearCart); // Pasamos clearCart como callback
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi E-Commerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contacto</NavLink></li>
            {user?.role === 'admin' && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
            )}
          </ul>
          
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
               <NavLink to="/carrito" className="btn btn-secondary position-relative">
                  <i className="bi bi-cart-fill"></i> Carrito
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
               </NavLink>
            </li>
            
            {user ? (
              <>
                <li className="nav-item me-2 text-light">Hola, {user.name} ({user.role})</li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-light btn-sm">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;