// Utiliza el componente Pagination.

import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination'; // Importamos el componente

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Cantidad de productos por página

  // Manejo de estados de carga y error
  if (loading) return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="spinner-border text-primary mb-2" role="status"></div>
      <h4 className="text-muted">Cargando productos...</h4>
    </div>
  );
  
  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  // Lógica de Paginación: Obtener productos actuales
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página (se pasa al componente hijo)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="mb-4 display-6">Nuestros Productos</h2>
      
      <div className="row g-4">
        {currentItems.map(prod => (
          <div key={prod.id} className="col-md-4 col-sm-6">
            <ProductCard product={prod} />
          </div>
        ))}
        
        {products.length === 0 && (
          <div className="col-12 text-center">
            <p className="lead">No hay productos disponibles en este momento.</p>
          </div>
        )}
      </div>

      {/* Componente de Paginación Separado */}
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

