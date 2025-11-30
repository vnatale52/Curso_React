// Es una mera simulación de envío real.

import { useState } from 'react';

const Contact = () => {
  // 1. Estado para los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 2. Estados para el manejo de la interfaz (Carga y Éxito)
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Activar estado de carga (bloquea botón y muestra spinner)
    setIsSending(true);
    setShowSuccess(false);

    // SIMULACIÓN DE LLAMADA A API (2 segundos)
    setTimeout(() => {
      // Aquí iría la llamada real a un servicio como EmailJS o un Backend
      console.log("--- Enviando Formulario al Servidor ---");
      console.log("Datos:", formData);
      
      // Finalizar carga y mostrar éxito
      setIsSending(false);
      setShowSuccess(true);
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        
        {/* Columna de Información de Contacto */}
        <div className="col-md-5 mb-4">
          <h2 className="mb-4 display-6">Ponte en Contacto</h2>
          <p className="lead text-muted">
            ¿Tienes alguna duda sobre nuestros productos? Estamos aquí para ayudarte.
          </p>
          
          <div className="mt-5">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary text-white rounded-circle p-3 me-3">
                <i className="bi bi-geo-alt-fill fs-4"></i>
              </div>
              <div>
                <h5 className="mb-0">Ubicación</h5>
                <p className="mb-0 text-muted">Av. Tecnología 123, Ciudad Digital</p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary text-white rounded-circle p-3 me-3">
                <i className="bi bi-envelope-fill fs-4"></i>
              </div>
              <div>
                <h5 className="mb-0">Email</h5>
                <p className="mb-0 text-muted">contacto@ecommerce-react.com</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="bg-primary text-white rounded-circle p-3 me-3">
                <i className="bi bi-telephone-fill fs-4"></i>
              </div>
              <div>
                <h5 className="mb-0">Teléfono</h5>
                <p className="mb-0 text-muted">+54 11 9999-9999</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna del Formulario */}
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              <h4 className="card-title mb-4">Envíanos un mensaje</h4>
              
              {/* Alerta de Éxito */}
              {showSuccess && (
                <div className="alert alert-dismissible alert-success fade show" role="alert">
                  <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
                  <strong>¡Mensaje Enviado!</strong> Nos pondremos en contacto contigo a la brevedad.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        disabled={isSending}
                      />
                      <label htmlFor="name">Nombre Completo</label>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        disabled={isSending}
                      />
                      <label htmlFor="email">Correo Electrónico</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="subject" 
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    disabled={isSending}
                  />
                  <label htmlFor="subject">Asunto</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea 
                    className="form-control" 
                    placeholder="Deja tu mensaje aquí" 
                    id="message" 
                    name="message"
                    style={{ height: '150px' }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                  ></textarea>
                  <label htmlFor="message">Mensaje</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isSending}>
                    {isSending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i> Enviar Mensaje (no es real, es simulado)
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
