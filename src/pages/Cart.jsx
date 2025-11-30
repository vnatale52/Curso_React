
// Incorpora alternativas para realizar el pago de la compra
// Cambiado la estructura de la tabla para que sea "semántica" en escritorio, pero "flexible" en móvil.

import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, addToCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5 px-3">
        <div className="mb-4">
            <i className="bi bi-cart-x display-1 text-muted"></i>
        </div>
        <h3 className="h2">Tu carrito está vacío</h3>
        <p className="text-muted">Aún no has agregado productos.</p>
        <Link to="/productos" className="btn btn-primary mt-3 w-100 w-md-auto">
          Ir a comprar
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 h4 border-bottom pb-2">
        <i className="bi bi-cart3 me-2"></i>Carrito de Compras
      </h2>
      
      {/* 
         El truco aquí es usar clases CSS (cart-header-row, cart-row) 
         que definimos en index.css para transformar la tabla en tarjetas en móvil 
      */}
      <div className="mb-4">
        <table className="table align-middle mb-0" style={{background: 'transparent'}}>
          <thead className="table-light cart-header-row">
            <tr>
              <th className="ps-4">Producto</th>
              <th>Precio</th>
              <th className="text-center">Cantidad</th>
              <th>Subtotal</th>
              <th className="text-end pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="cart-row bg-white">
                
                {/* 1. Producto */}
                <td className="cart-cell cart-cell-product ps-md-4">
                    <div className="d-flex align-items-center w-100">
                        <div style={{width: '60px', height: '60px', minWidth: '60px'}} className="me-3 p-1 border rounded bg-white d-flex align-items-center justify-content-center">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                            />
                        </div>
                        <div className="text-truncate">
                            <span className="fw-bold d-block text-truncate" style={{maxWidth: '200px'}}>{item.name}</span>
                            <small className="text-muted d-md-none">Unitario: ${Number(item.price).toFixed(2)}</small>
                        </div>
                    </div>
                </td>

                {/* 2. Precio (Oculto en móvil porque ya lo mostramos arriba o en subtotal) */}
                <td className="cart-cell d-none d-md-table-cell" data-label="Precio">
                  ${Number(item.price).toFixed(2)}
                </td>

                {/* 3. Cantidad */}
                <td className="cart-cell" data-label="Cantidad">
                    <div className="d-flex align-items-center justify-content-end justify-content-md-center">
                      <button 
                        className="btn btn-sm btn-outline-secondary p-2 px-3" 
                        onClick={() => removeFromCart(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      
                      <span className="fw-bold mx-3 fs-5">
                        {item.quantity}
                      </span>
                      
                      <button 
                        className="btn btn-sm btn-outline-primary p-2 px-3" 
                        onClick={() => addToCart(item)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                </td>

                {/* 4. Subtotal */}
                <td className="cart-cell" data-label="Subtotal">
                    <span className="fw-bold text-primary fs-5">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </td>

                {/* 5. Acciones */}
                <td className="cart-cell text-end pe-md-4" data-label="Acciones">
                  <button 
                    onClick={() => removeFromCart(item.id, true)} 
                    className="btn btn-outline-danger btn-sm w-100 w-md-auto" 
                    title="Eliminar"
                  >
                    <i className="bi bi-trash me-2"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer del Carrito (Sticky en móvil para fácil acceso) */}
      <div className="fixed-bottom d-md-static bg-white border-top shadow-lg p-3 d-md-none">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">Total:</span>
            <span className="fw-bold text-success fs-4">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-success w-100 py-2 fw-bold">
            Pagar Ahora
          </Link>
      </div>

      {/* Footer para Desktop */}
      <div className="row d-none d-md-flex">
        <div className="col-md-6 col-lg-4 ms-auto">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-4">
                  <h4 className="fw-bold">Total:</h4>
                  <h4 className="fw-bold text-success">${total.toFixed(2)}</h4>
                </div>
                <div className="d-grid gap-2">
                  <Link to="/checkout" className="btn btn-success btn-lg shadow-sm">
                    Proceder al Pago
                  </Link>
                  <Link to="/productos" className="btn btn-outline-secondary">
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      {/* Espaciador para que el footer fijo no tape contenido en móvil */}
      <div className="d-md-none" style={{height: '100px'}}></div>
    </div>
  );
};

export default Cart;