import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Tu carrito está vacío</h3>
        <Link to="/productos" className="btn btn-primary mt-3">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Carrito de Compras</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
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
                        <img src={item.image} alt={item.name} width="50" className="me-2 rounded"/>
                        {item.name}
                    </div>
                </td>
                <td>${item.price}</td>
                <td>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => removeFromCart(item.id)}>-</button>
                    <strong>{item.quantity}</strong>
                     {/* Nota: Para sumar más, el usuario debe ir al listado o implementarse un addToCart aquí también */}
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id, true)} className="btn btn-danger btn-sm">
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end align-items-center bg-light p-3 rounded">
          <h4 className="mb-0 me-3">Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Cart;