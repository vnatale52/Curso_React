import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 text-center mt-4 border shadow-sm">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold text-primary">Bienvenido a nuestra Tienda</h1>
        <p className="col-md-8 fs-4 mx-auto text-secondary">
          Explora los mejores productos tecnológicos seleccionados especialmente para ti. Calidad garantizada y envíos a todo el país.
        </p>
        <div className="mt-4">
          <Link to="/productos" className="btn btn-primary btn-lg px-4 me-2" type="button">
            <i className="bi bi-shop"></i> Ver Catálogo
          </Link>
          <Link to="/contact" className="btn btn-outline-secondary btn-lg px-4" type="button">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;