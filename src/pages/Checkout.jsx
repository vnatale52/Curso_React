// Contiene toda la lógica del formulario y la simulación de la pasarela de pagos

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si el carrito está vacío, redirigir a productos
  if (cart.length === 0) return <Navigate to="/productos" replace />;

  const [paymentMethod, setPaymentMethod] = useState('credit-card'); // 'credit-card', 'paypal', 'transfer'
  const [processing, setProcessing] = useState(false);

  // Manejo del formulario
  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);

    // SIMULACIÓN DE PROCESO DE PAGO (3 segundos)
    setTimeout(() => {
      setProcessing(false);
      clearCart(); // Vaciar carrito
      alert(`¡Pago realizado con éxito mediante ${getPaymentMethodName()}!\nGracias por tu compra, ${user?.name || 'Cliente'}.`);
      navigate('/'); // Volver al inicio
    }, 3000);
  };

  const getPaymentMethodName = () => {
    if (paymentMethod === 'credit-card') return 'Tarjeta de Crédito/Débito';
    if (paymentMethod === 'paypal') return 'PayPal';
    return 'Transferencia Bancaria';
  };

  return (
    <div className="row g-5">
      {/* COLUMNA IZQUIERDA: Formulario de Pago */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Dirección de Envío</h4>
        <form onSubmit={handlePayment}>
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" defaultValue={user?.name} required />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="col-12">
              <label className="form-label">Dirección</label>
              <input type="text" className="form-control" placeholder="Calle 123" required />
            </div>
            <div className="col-md-5">
              <label className="form-label">País</label>
              <select className="form-select" required>
                <option value="">Seleccionar...</option>
                <option>Argentina</option>
                <option>México</option>
                <option>Colombia</option>
                <option>España</option>
              </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">Ciudad</label>
                <input type="text" className="form-control" required />
            </div>
            <div className="col-md-3">
              <label className="form-label">CP</label>
              <input type="text" className="form-control" required />
            </div>
          </div>

          <hr className="my-4" />

          <h4 className="mb-3">Método de Pago</h4>
          <div className="my-3">
            <div className="form-check">
              <input 
                id="credit" name="paymentMethod" type="radio" className="form-check-input" 
                checked={paymentMethod === 'credit-card'} 
                onChange={() => setPaymentMethod('credit-card')} 
              />
              <label className="form-check-label" htmlFor="credit">Tarjeta de Crédito / Débito</label>
            </div>
            <div className="form-check">
              <input 
                id="paypal" name="paymentMethod" type="radio" className="form-check-input" 
                checked={paymentMethod === 'paypal'} 
                onChange={() => setPaymentMethod('paypal')} 
              />
              <label className="form-check-label" htmlFor="paypal">PayPal</label>
            </div>
            <div className="form-check">
              <input 
                id="transfer" name="paymentMethod" type="radio" className="form-check-input" 
                checked={paymentMethod === 'transfer'} 
                onChange={() => setPaymentMethod('transfer')} 
              />
              <label className="form-check-label" htmlFor="transfer">Transferencia Bancaria</label>
            </div>
          </div>

          {/* CAMPOS DINÁMICOS SEGÚN PAGO */}
          <div className="card p-4 bg-light mb-4">
            
            {/* TARJETA */}
            {paymentMethod === 'credit-card' && (
              <div className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre en la tarjeta</label>
                  <input type="text" className="form-control" required />
                  <small className="text-muted">Como figura en el plástico</small>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Número de tarjeta</label>
                  <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Vencimiento</label>
                  <input type="text" className="form-control" placeholder="MM/AA" required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="123" required />
                </div>
                <div className="col-12 mt-3">
                    <i className="bi bi-credit-card-2-front fs-4 me-2"></i>
                    <i className="bi bi-credit-card-2-back fs-4"></i>
                </div>
              </div>
            )}

            {/* PAYPAL */}
            {paymentMethod === 'paypal' && (
              <div className="text-center">
                 <p className="lead">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                 <i className="bi bi-paypal text-primary display-4"></i>
              </div>
            )}

            {/* TRANSFERENCIA */}
            {paymentMethod === 'transfer' && (
              <div>
                  <p className="fw-bold">Datos bancarios:</p>
                  <ul className="list-unstyled">
                      <li>Banco: Bank Global</li>
                      <li>CBU: 0000003100000000000000</li>
                      <li>Alias: MI.ECOMMERCE.PAGO</li>
                      <li>Titular: E-Commerce S.A.</li>
                  </ul>
                  <div className="alert alert-info py-2">
                      <small>El pedido se procesará una vez envíes el comprobante.</small>
                  </div>
              </div>
            )}
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={processing}>
            {processing ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Procesando pago...
                </>
            ) : (
                `Pagar $${total.toFixed(2)}`
            )}
          </button>
        </form>
      </div>

      {/* COLUMNA DERECHA: Resumen de Orden */}
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Tu Carrito</span>
          <span className="badge bg-primary rounded-pill">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </h4>
        <ul className="list-group mb-3 shadow-sm">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-muted">Cant: {item.quantity}</small>
              </div>
              <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Código Promocional</h6>
              <small>REACT2023</small>
            </div>
            <span className="text-success">-$0.00</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>${total.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;