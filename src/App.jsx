// Esta versión incluye la integración de todas las funcionalidades que hemos desarrollado, incluyendo la nueva ruta protegida para la pasarela de pagos (/checkout).

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importación de Proveedores de Contexto
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

// Componentes de Layout y Seguridad
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Importación de Páginas
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // Nueva página de pago
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* 1. Proveedor de Autenticación (User/Admin) */}
      <AuthProvider>
        {/* 2. Proveedor de Productos (API/JSON) */}
        <ProductProvider>
          {/* 3. Proveedor del Carrito (Estado de compras) */}
          <CartProvider>
            
            <Routes>
              {/* --- RUTAS PÚBLICAS --- */}
              
              {/* Ruta Raíz: Muestra el catálogo directamente */}
              <Route path="/" element={
                <Layout>
                  <ProductList />
                </Layout>
              } />
              
              <Route path="/login" element={
                <Layout>
                  <Login />
                </Layout>
              } />
              
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
              
              <Route path="/about" element={
                <Layout>
                  <About />
                </Layout>
              } />
              
              <Route path="/contact" element={
                <Layout>
                  <Contact />
                </Layout>
              } />

              {/* --- RUTAS PROTEGIDAS (Requieren Login) --- */}
              
              <Route path="/carrito" element={
                <ProtectedRoute>
                  <Layout>
                    <Cart />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Nueva ruta de Checkout protegida */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Layout>
                    <Checkout />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* --- RUTA DE ADMINISTRADOR (Requiere Login + Rol Admin) --- */}
              
              <Route path="/admin" element={
                <ProtectedRoute roleRequired="admin">
                  <Layout>
                    <Admin />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* --- MANEJO DE RUTAS NO ENCONTRADAS --- */}
              {/* Redirige cualquier ruta desconocida al inicio */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
            
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;