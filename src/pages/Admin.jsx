import { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const Admin = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useProducts();
  
  // Estado inicial del formulario
  const initialFormState = { id: null, name: '', price: '', image: '', description: '' };
  const [formData, setFormData] = useState(initialFormState);
  
  // Estado para saber si estamos editando o creando
  const [isEditing, setIsEditing] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Cargar datos en el formulario para editar
  const handleEditClick = (product) => {
    setFormData(product); // Llenamos el form con los datos del producto
    setIsEditing(true);   // Activamos modo edición
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir para ver el form
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setIsEditing(false);
  };

  // Enviar formulario (Alta o Modificación)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.name || !formData.price || !formData.description) {
      return alert("Por favor complete nombre, precio y descripción.");
    }

    if (isEditing) {
      // --- Lógica de MODIFICACIÓN ---
      updateProduct({
        ...formData,
        price: Number(formData.price) // Aseguramos que sea número
      });
      alert("Producto modificado correctamente.");
    } else {
      // --- Lógica de ALTA ---
      // Eliminamos el ID null para que el context genere uno nuevo
      const { id, ...newProductData } = formData;
      addProduct({
        ...newProductData,
        price: Number(formData.price),
        image: formData.image || "https://dummyimage.com/400x300/aaa/fff&text=Nuevo+Producto"
      });
      alert("Producto agregado al stock.");
    }

    // Resetear formulario
    setFormData(initialFormState);
    setIsEditing(false);
  };

  // Manejar eliminación
  const handleDelete = (id) => {
    if(window.confirm("¿Confirma que desea eliminar este producto del stock?")) {
        deleteProduct(id);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-primary border-bottom pb-2">
        <i className="bi bi-gear-fill me-2"></i>Panel de Administración
      </h2>

      {/* --- FORMULARIO DE GESTIÓN --- */}
      <div className={`card mb-5 shadow ${isEditing ? 'border-warning' : 'border-success'}`}>
        <div className={`card-header text-white ${isEditing ? 'bg-warning' : 'bg-success'}`}>
          <h5 className="mb-0">
            {isEditing ? '✏️ Modificar Producto Existente' : '➕ Agregar Nuevo Producto (simulado sólo para la sesión actual, no persistente)'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Nombre */}
              <div className="col-md-6">
                <label className="form-label">Nombre del Producto</label>
                <input 
                  type="text" name="name" className="form-control" 
                  value={formData.name} onChange={handleChange} 
                  placeholder="Ej: Laptop Gamer" 
                />
              </div>

              {/* Precio */}
              <div className="col-md-6">
                <label className="form-label">Precio ($)</label>
                <input 
                  type="number" name="price" className="form-control" 
                  value={formData.price} onChange={handleChange} 
                  placeholder="0.00" 
                />
              </div>

              {/* URL Imagen */}
              <div className="col-12">
                <label className="form-label">URL de la Imagen</label>
                <input 
                  type="text" name="image" className="form-control" 
                  value={formData.image} onChange={handleChange} 
                  placeholder="https://..." 
                />
                <small className="text-muted">Si deja vacío, se usará una imagen por defecto.</small>
              </div>

              {/* Descripción (NUEVO REQUERIMIENTO) */}
              <div className="col-12">
                <label className="form-label">Descripción Detallada</label>
                <textarea 
                  name="description" className="form-control" rows="3"
                  value={formData.description} onChange={handleChange}
                  placeholder="Ingrese las características principales del producto..."
                ></textarea>
              </div>

              {/* Botones de Acción */}
              <div className="col-12 d-flex gap-2 justify-content-end">
                {isEditing && (
                  <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                    Cancelar Edición
                  </button>
                )}
                <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'}`}>
                  {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* --- LISTA DE INVENTARIO --- */}
      <h4 className="mb-3">Inventario Actual</h4>
      <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-dark">
                  <tr>
                      <th>Img</th>
                      <th>Nombre / Descripción</th>
                      <th>Precio</th>
                      <th className="text-end">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  {products.map(p => (
                      <tr key={p.id}>
                          <td>
                            <img src={p.image} alt="mini" width="50" height="50" className="rounded object-fit-cover"/>
                          </td>
                          <td>
                            <div className="fw-bold">{p.name}</div>
                            <small className="text-muted d-block text-truncate" style={{maxWidth: '300px'}}>
                              {p.description}
                            </small>
                          </td>
                          <td>${Number(p.price).toFixed(2)}</td>
                          <td className="text-end">
                              {/* Botón Editar */}
                              <button 
                                onClick={() => handleEditClick(p)} 
                                className="btn btn-warning btn-sm me-2"
                                title="Editar"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              
                              {/* Botón Eliminar */}
                              <button 
                                onClick={() => handleDelete(p.id)} 
                                className="btn btn-danger btn-sm"
                                title="Dar de baja"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {products.length === 0 && <div className="p-3 text-center">No hay productos en inventario.</div>}
      </div>
    </div>
  );
};

export default Admin;