// Implementa Ruta Dinámica

import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) return <div className="alert alert-warning">Producto no encontrado</div>;

  return (
    <div className="card mb-3 shadow">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p className="card-text">{product.description || "Sin descripción detallada."}</p>
            <h3 className="text-success">${product.price}</h3>
            <div className="mt-4">
               <button onClick={() => addToCart(product)} className="btn btn-primary me-2">Agregar al Carrito</button>
               <Link to="/productos" className="btn btn-secondary">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;