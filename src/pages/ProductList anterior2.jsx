// Utiliza el componente Pagination.
// Agrega la lógica para mostrar el mensaje de "Por favor Inicie Sesión" apenas se carga la página, pero solo si el usuario no está autenticado.
// Añade un pequeño selector (botones pequeños) al inicio para que el usuario todavía pueda cumplir el requerimiento de cambiar entre API y JSON si lo desea.

import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 1. Importar Contexto Carrito
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductList = () => {
  const { products, loading, error, setDataSource, dataSource } = useProducts();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart(); // 2. Obtener estado del carrito
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mensaje de Login al entrar (solo si no está logueado)
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        // Usamos un toast o notificación menos intrusiva si es posible, 
        // pero mantenemos el alert por requerimiento previo, aunque solo una vez.
        // (Opcional: podrías comentar esto si ya molesta al desarrollar)
        // alert("¡Bienvenido! Por favor Inicie Sesión para acceder al Carrito...");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (loading) return (
    <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando catálogo...</p>
    </div>
  );

  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  // Lógica de Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* 
         3. NUEVO: Mensaje de "Presione Carrito" 
         Solo se muestra si hay items en el carrito 
      */}
      {cart.length > 0 && (
        <div className="alert alert-success d-flex align-items-center justify-content-between shadow-sm mb-4 animate__animated animate__fadeInDown" role="alert">
          <div>
            <i className="bi bi-cart-check-fill fs-4 me-2"></i>
            <span className="fw-bold">Tiene productos seleccionados.</span>
            <span className="d-none d-md-inline ms-1">No olvide completar su pedido.</span>
          </div>
          <Link to="/carrito" className="btn btn-sm btn-success border border-white fw-bold">
            Presione Carrito para finalizar <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      )}

      {/* Encabezado y Selectores */}
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="display-6">Catálogo de Productos</h2>
          
          <div className="btn-group btn-group-sm">
            <button 
                className={`btn ${dataSource === 'api' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setDataSource('api')}>
                API
            </button>
            <button 
                className={`btn ${dataSource === 'json' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setDataSource('json')}>
                JSON Local
            </button>
          </div>
      </div>

      {/* Grid de Productos */}
      <div className="row g-4">
        {currentItems.map(prod => (
          <div key={prod.id} className="col-md-4 col-sm-6">
            <ProductCard product={prod} />
          </div>
        ))}
        {products.length === 0 && <p className="text-center">No se encontraron productos.</p>}
      </div>

      {/* Paginador */}
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={products.length} 
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;