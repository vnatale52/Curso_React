import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleFinalizePurchase = () => {
    // 1. Mostrar mensaje
    alert("¡Compra finalizada con éxito! Gracias por su preferencia.");
    
    // 2. Vaciar el carrito
    clearCart();
    
    // 3. Redirigir al inicio (opcional, pero recomendado por UX)
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3 className="display-6">Tu carrito está vacío</h3>
        <p className="text-muted">Parece que aún no has agregado productos.</p>
        <Link to="/productos" className="btn btn-primary mt-3">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Carrito de Compras</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} width="50" className="me-3 rounded border"/>
                            <span className="fw-bold">{item.name}</span>
                        </div>
                    </td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => removeFromCart(item.id)}>-</button>
                          <span className="fw-bold mx-2">{item.quantity}</span>
                        </div>
                    </td>
                    <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id, true)} className="btn btn-danger btn-sm" title="Eliminar producto">
                        <i className="bi bi-trash"></i> 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6 ms-auto">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h4>Total a Pagar:</h4>
                  <h4 className="text-success">${total.toFixed(2)}</h4>
                </div>
                <div className="d-grid">
                  {/* Evento agregado aquí */}
                  <button onClick={handleFinalizePurchase} className="btn btn-success btn-lg">
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;