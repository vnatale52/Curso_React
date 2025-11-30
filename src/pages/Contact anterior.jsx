import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    alert("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto."); 
  };

  return (
    <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6">
            <h2 className="text-center mb-4">Contáctanos</h2>
            <div className="card shadow p-4">
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label className="form-label">Correo Electrónico</label>
                      <input type="email" required className="form-control" placeholder="nombre@ejemplo.com" />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Asunto</label>
                      <input type="text" required className="form-control" placeholder="Consulta sobre producto..." />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Mensaje</label>
                      <textarea required className="form-control" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
              </form>
            </div>
        </div>
    </div>
  );
};

export default Contact;