// Configuración de rutas y Providers.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';
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
            {/* El Layout envuelve las rutas internas, pero Welcome puede estar fuera si se desea, 
                aquí lo pondremos dentro para consistencia, o condicionalmente */}
            <Routes>
              {/* Ruta inicial de selección de datos */}
              <Route path="/" element={<Welcome />} />
              
              {/* Ruta Login */}
              <Route path="/login" element={<Layout><Login /></Layout>} />

              {/* Rutas Públicas dentro del Layout */}
              <Route path="/home" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              
              <Route path="/productos" element={
                <Layout>
                   <ProductList />
                </Layout>
              } />
              
              <Route path="/producto/:id" element={
                <Layout>
                   <ProductDetail />
                </Layout>
              } />

              {/* Rutas Protegidas */}
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

              {/* Redirección por defecto */}
              <Route path="*" element={<Welcome />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;