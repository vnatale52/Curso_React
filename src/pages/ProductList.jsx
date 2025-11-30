// Utiliza el componente Pagination.
// Agrega la lógica para mostrar el mensaje de "Por favor Inicie Sesión" apenas se carga la página, pero solo si el usuario no está autenticado.
// Añade un pequeño selector (botones pequeños) al inicio para que el usuario todavía pueda cumplir el requerimiento de cambiar entre API y JSON si lo desea.

import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext'; // Importamos Auth
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductList = () => {
  const { products, loading, error, setDataSource, dataSource } = useProducts();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // EFECTO: Mostrar mensaje de Login al entrar
  useEffect(() => {
    if (!isAuthenticated) {
      // Usamos setTimeout para asegurar que el DOM cargue primero y no sea intrusivo instantáneamente
      setTimeout(() => {
        alert("¡Bienvenido! Por favor Inicie Sesión para acceder al Carrito y finalizar compras.");
      }, 500);
    }
  }, [isAuthenticated]);

  if (loading) return (
    <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando catálogo...</p>
    </div>
  );

  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  // Paginación logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="display-6">Catálogo de Productos</h2>
          
          {/* Pequeño control para cambiar fuente de datos (Requerimiento opcional) */}
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

      <div className="row g-4">
        {currentItems.map(prod => (
          <div key={prod.id} className="col-md-4 col-sm-6">
            <ProductCard product={prod} />
          </div>
        ))}
        {products.length === 0 && <p className="text-center">No se encontraron productos.</p>}
      </div>

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