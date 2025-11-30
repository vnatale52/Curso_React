import React from 'react';

const About = () => {
  return (
    <div className="text-center mt-5">
        <h2 className="display-4">Sobre Nosotros</h2>
        <p className="lead mt-3 text-muted">
          Somos una empresa líder en venta de tecnología. Nuestro objetivo es acercar la innovación a tu hogar con los mejores precios del mercado.
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>"La tecnología es mejor cuando une a las personas."</p>
                  <footer className="blockquote-footer"> - Trabajo práctico realizado por Vincenzo para el curso de REACT.JS - </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default About;