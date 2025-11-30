// Incluye Páginas extra (About, Contact, Home)

import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container pb-5">
        {children}
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>&copy; 2025 E-Commerce App. Todos los derechos reservados.</small>
      </footer>
    </>
  );
};

export default Layout;