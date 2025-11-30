import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Ingrese un nombre");
    login(username, isAdmin);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white text-center">
            <h4>Iniciar Sesión</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre de Usuario</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: Juan Perez"
                />
              </div>
              <div className="mb-3 form-check form-switch">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label className="form-check-label">Entrar como Administrador</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;