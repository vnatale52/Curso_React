// Componente visual de producto.

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm border-0 product-card-hover">
      {/* 
        CONTENEDOR DE IMAGEN 
        - bg-white: Fondo blanco para que las imágenes transparentes (PNG) se vean bien.
        - height: 160px fijo para uniformidad en móviles.
      */}
      <div className="d-flex align-items-center justify-content-center p-2 bg-white position-relative rounded-top" style={{ overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="img-fluid"
          style={{ height: '160px', objectFit: 'contain', transition: 'transform 0.3s' }} 
        />
      </div>
      
      {/* CUERPO DE LA TARJETA */}
      <div className="card-body d-flex flex-column bg-light p-2 p-md-3">
        
        {/* Título: Texto más pequeño en móvil (0.9rem) para evitar cortes feos */}
        <h6 className="card-title text-truncate mb-1 text-dark" style={{fontSize: '0.95rem', fontWeight: 'bold'}} title={product.name}>
          {product.name}
        </h6>
        
        {/* Precio */}
        <div className="mb-2">
          <span className="badge bg-success shadow-sm">${Number(product.price).toFixed(2)}</span>
        </div>

        {/* 
           Descripción:
           - d-none d-sm-block: SE OCULTA en celulares muy pequeños (xs) para ahorrar espacio vertical.
           - WebkitLineClamp: Corta el texto a 2 líneas y pone "..."
        */}
        <p className="card-text text-muted small flex-grow-1 d-none d-sm-block" 
           style={{ 
             display: '-webkit-box', 
             WebkitLineClamp: 2, 
             WebkitBoxOrient: 'vertical', 
             overflow: 'hidden',
             fontSize: '0.85rem'
           }}>
          {product.description}
        </p>
        
        {/* BOTONES DE ACCIÓN */}
        <div className="mt-auto d-flex flex-column gap-2">
           {/* Botón Agregar: Ancho completo y padding extra para dedos */}
           <button 
             onClick={() => addToCart(product)} 
             className="btn btn-primary btn-sm w-100 py-1 py-md-2 fw-bold shadow-sm">
             <i className="bi bi-cart-plus-fill me-1"></i> 
             <span className="d-inline">Agregar</span>
           </button>
           
           {/* Botón Ver Detalle */}
           <Link to={`/producto/${product.id}`} className="btn btn-outline-dark btn-sm w-100">
             Ver Detalle
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;