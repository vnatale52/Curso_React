// Pantalla inicial para elegir fuente de datos.

import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Welcome = () => {
  const { setDataSource } = useProducts();
  const navigate = useNavigate();

  const handleSelection = (source) => {
    setDataSource(source);
    navigate('/login'); // Ir a login tras seleccionar fuente
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="display-4 mb-5">Bienvenido al E-Commerce</h1>
      <div className="card p-5 shadow">
        <h3 className="mb-4 text-center">Seleccione el origen de los datos:</h3>
        <div className="d-grid gap-3">
          <button 
            onClick={() => handleSelection('api')} 
            className="btn btn-lg btn-primary">
            a) Carga desde FakeStoreApi.com
          </button>
          <button 
            onClick={() => handleSelection('json')} 
            className="btn btn-lg btn-secondary">
            b) Carga desde un Archivo JSON Local
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;