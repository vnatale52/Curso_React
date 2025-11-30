// Eliminamos la ruta de Welcome y hacemos que la ruta raíz / muestre directamente la lista de productos (ProductList).

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* CAMBIO: La ruta raíz '/' ahora carga ProductList directamente dentro del Layout */}
              <Route path="/" element={<Layout><ProductList /></Layout>} />
              
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/productos" element={<Layout><ProductList /></Layout>} />
              <Route path="/producto/:id" element={<Layout><ProductDetail /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />

              <Route path="/carrito" element={
                <ProtectedRoute>
                  <Layout><Cart /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/admin" element={
                <ProtectedRoute roleRequired="admin">
                  <Layout><Admin /></Layout>
                </ProtectedRoute>
              } />

              <Route path="*" element={<Layout><ProductList /></Layout>} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;