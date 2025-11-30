// Incluye Páginas extra (About, Contact, Home)

import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    // Agregamos un fondo gris claro (bg-light o estilo personalizado) a todo el contenedor
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f4f6f8' }}>
      
      <Navbar />
      
      {/* 
         IMPORTANTE: Agregamos 'marginTop' o 'paddingTop' 
         para compensar la altura del Navbar fijo (aprox 80px) 
      */}
      <main className="container flex-grow-1 pb-5" style={{ paddingTop: '90px' }}>
        {children}
      </main>
      
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <small>&copy; 2025 E-Commerce App. Trabajo para el curso de React 2025.</small>
          <div className="mt-2">
            <i className="bi bi-facebook mx-2"></i>
            <i className="bi bi-instagram mx-2"></i>
            <i className="bi bi-twitter mx-2"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;