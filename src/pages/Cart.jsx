
// Incorpora alternativas para realizar el pago de la compra

import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Destructuramos addToCart también para permitir sumar items desde aquí
  const { cart, removeFromCart, addToCart, total } = useCart();

  // 1. Vista si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="mb-4">
            <i className="bi bi-cart-x display-1 text-muted"></i>
        </div>
        <h3 className="display-6">Tu carrito está vacío</h3>
        <p className="text-muted lead">Parece que aún no has agregado productos.</p>
        <Link to="/productos" className="btn btn-primary btn-lg mt-3">
          <i className="bi bi-arrow-left me-2"></i>Ir a comprar
        </Link>
      </div>
    );
  }

  // 2. Vista con productos
  return (
    <div>
      <h2 className="mb-4 border-bottom pb-2">
        <i className="bi bi-cart3 me-2"></i>Carrito de Compras
      </h2>
      
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-4">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col" className="text-center">Cantidad</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col" className="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td className="ps-4">
                        <div className="d-flex align-items-center">
                            <div style={{width: '60px', height: '60px'}} className="me-3 p-1 border rounded bg-white d-flex align-items-center justify-content-center">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                                />
                            </div>
                            <div>
                                <span className="fw-bold d-block">{item.name}</span>
                                <small className="text-muted d-none d-md-block" style={{maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                    {item.description}
                                </small>
                            </div>
                        </div>
                    </td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-center">
                          {/* Botón Restar */}
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={() => removeFromCart(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          
                          <span className="fw-bold mx-3" style={{minWidth: '20px', textAlign: 'center'}}>
                            {item.quantity}
                          </span>
                          
                          {/* Botón Sumar (Reutiliza la lógica de addToCart) */}
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => addToCart(item)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                    </td>
                    <td className="fw-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        onClick={() => removeFromCart(item.id, true)} 
                        className="btn btn-outline-danger btn-sm" 
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash"></i> <span className="d-none d-md-inline">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Sección de Total y Botón de Pago */}
      <div className="row">
        <div className="col-md-6 col-lg-4 ms-auto">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <h4 className="fw-bold">Total:</h4>
                  <h4 className="fw-bold text-success">${total.toFixed(2)}</h4>
                </div>
                
                <div className="d-grid gap-2">
                  {/* CAMBIO IMPORTANTE: Redirección a /checkout */}
                  <Link to="/checkout" className="btn btn-success btn-lg shadow-sm">
                    Proceder al Pago <i className="bi bi-credit-card ms-2"></i>
                  </Link>
                  
                  <Link to="/productos" className="btn btn-outline-secondary">
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;