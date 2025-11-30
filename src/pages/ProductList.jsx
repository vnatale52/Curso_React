// Utiliza el componente Pagination.
// Agrega la lógica para mostrar el mensaje de "Por favor Inicie Sesión" apenas se carga la página, pero solo si el usuario no está autenticado.
// Añade un pequeño selector (botones pequeños) al inicio para que el usuario todavía pueda cumplir el requerimiento de cambiar entre API y JSON si lo desea.

import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductList = () => {
  // 1. Consumo de Contextos
  const { products, loading, error, setDataSource, dataSource } = useProducts();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  
  // 2. Estado local para Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 3. Efecto: Mensaje de Login (Opcional, para recordar al usuario)
  useEffect(() => {
    if (!isAuthenticated) {
      // Usamos un timer para que no sea invasivo apenas carga la página
      const timer = setTimeout(() => {
         // Puedes descomentar la siguiente línea si deseas el alert nativo:
         // alert("¡Bienvenido! Recuerde Iniciar Sesión para comprar.");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // 4. Manejo de Estados de Carga y Error
  if (loading) return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5 py-5">
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}></div>
        <p className="mt-3 text-muted fw-bold">Cargando catálogo...</p>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger mt-5 shadow-sm" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      Error: {error}
    </div>
  );

  // 5. Lógica de Paginación (Corte del array de productos)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fade-in">
      
      {/* --- ALERTA DE CARRITO (CTA) --- 
          Solo se muestra si el usuario ya agregó algo al carrito.
      */}
      {cart.length > 0 && (
        <div className="alert alert-success d-flex align-items-center justify-content-between shadow mb-4 sticky-top" 
             style={{top: '80px', zIndex: 1020}} role="alert">
          <div className="text-truncate me-2">
            <i className="bi bi-cart-check-fill fs-4 me-2"></i>
            <span className="fw-bold">Tiene productos pendientes.</span>
          </div>
          <Link to="/carrito" className="btn btn-sm btn-success border border-white fw-bold text-nowrap">
            Ir al Carrito <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      )}

      {/* --- ENCABEZADO Y FILTROS --- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          <h2 className="display-6 fw-bold mb-0">Catálogo</h2>
          
          {/* Selector de Fuente de Datos (Requerimiento) */}
          <div className="btn-group btn-group-sm shadow-sm">
            <button 
                className={`btn ${dataSource === 'api' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setDataSource('api')}>
                <i className="bi bi-cloud-arrow-down me-1"></i> API
            </button>
            <button 
                className={`btn ${dataSource === 'json' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setDataSource('json')}>
                <i className="bi bi-hdd me-1"></i> Local
            </button>
          </div>
      </div>

      {/* --- GRILLA DE PRODUCTOS (Mobile First) --- */}
      {/* 
          row g-2: Espacio reducido entre columnas en móvil.
          g-md-4: Espacio normal en escritorio.
      */}
      <div className="row g-2 g-md-4">
        {currentItems.map(prod => (
          // col-6: Ocupa 50% de ancho en móviles (2 columnas).
          // col-md-4: Ocupa 33% en tablets/escritorio (3 columnas).
          <div key={prod.id} className="col-6 col-md-4 col-lg-4 d-flex">
            <ProductCard product={prod} />
          </div>
        ))}
        
        {products.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-4">No se encontraron productos disponibles.</p>
          </div>
        )}
      </div>

      {/* --- PAGINADOR --- */}
      <div className="py-4">
        <Pagination 
          itemsPerPage={itemsPerPage} 
          totalItems={products.length} 
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;