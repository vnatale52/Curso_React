// Componente visual de producto.

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm border-0 product-card-hover">
      {/* Contenedor de imagen con altura fija y centrado */}
      <div className="d-flex align-items-center justify-content-center p-3 bg-white" style={{ height: '250px', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="img-fluid"
          style={{ maxHeight: '100%', objectFit: 'contain' }} // contain evita que se recorten las imágenes
        />
      </div>
      
      <div className="card-body d-flex flex-column bg-light">
        <h5 className="card-title text-truncate" title={product.name}>
          {product.name}
        </h5>
        
        <div className="mb-3">
          <span className="badge bg-success fs-6">${Number(product.price).toFixed(2)}</span>
        </div>

        <p className="card-text text-muted small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>
        
        <div className="mt-3 d-grid gap-2">
           <button 
             onClick={() => addToCart(product)} 
             className="btn btn-primary">
             <i className="bi bi-cart-plus-fill me-2"></i>Agregar
           </button>
           <Link to={`/producto/${product.id}`} className="btn btn-outline-dark btn-sm">
             Ver Detalles
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;