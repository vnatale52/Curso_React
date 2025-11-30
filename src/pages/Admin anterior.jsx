// Implementa CRUD

import { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const Admin = () => {
  const { products, deleteProduct, addProduct } = useProducts();
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });

  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de eliminar este producto por falta de stock?")) {
        deleteProduct(id);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.price) return;
    addProduct({
        ...formData,
        price: Number(formData.price),
        image: formData.image || "https://dummyimage.com/400x300/aaa/fff"
    });
    setFormData({ name: '', price: '', image: '' });
    alert("Producto agregado");
  };

  return (
    <div>
      <h2 className="mb-4 text-warning">Panel de Administración</h2>
      
      {/* Formulario de Alta */}
      <div className="card mb-5 p-3">
        <h5>Agregar Nuevo Producto</h5>
        <form onSubmit={handleAdd} className="row g-3">
            <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Nombre" 
                   value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="col-md-3">
                <input type="number" className="form-control" placeholder="Precio" 
                   value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="URL Imagen (Opcional)" 
                   value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
            </div>
            <div className="col-md-2">
                <button type="submit" className="btn btn-success w-100">Agregar</button>
            </div>
        </form>
      </div>

      {/* Lista para Bajas */}
      <h4>Inventario Actual</h4>
      <div className="table-responsive">
          <table className="table table-striped">
              <thead>
                  <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acción</th></tr>
              </thead>
              <tbody>
                  {products.map(p => (
                      <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>${p.price}</td>
                          <td>
                              <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">
                                  Eliminar (Baja)
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default Admin;