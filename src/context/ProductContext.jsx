import { createContext, useState, useEffect, useContext } from 'react';
import localData from '../services/demo-products.json';

// 1. Creación del Contexto
const ProductContext = createContext();

// 2. EXPORTACIÓN DEL HOOK PERSONALIZADO
// Esto es necesario para que 'useProducts' funcione en otros componentes
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

// 3. Componente Proveedor
export const ProductProvider = ({ children }) => {
  // Estado para la lista de productos
  const [products, setProducts] = useState([]);
  
  // Estados para manejo de UI (Carga y Errores)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para definir el origen de datos ('api' o 'json')
  // Inicializamos en 'api' para que cargue datos automáticamente al entrar
  const [dataSource, setDataSource] = useState('api'); 

  // URL de la API pública estable
  const API_URL = "https://fakestoreapi.com/products";

  // Efecto Secundario: Cargar productos cuando cambia la fuente de datos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        if (dataSource === 'api') {
          // --- Opción A: Carga desde API Externa ---
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Error al conectar con API Externa");
          
          const data = await response.json();
          
          // MAPEO DE DATOS: Adaptamos la estructura de FakeStoreAPI a nuestra App
          // La API devuelve 'title' pero nosotros usamos 'name' en los componentes
          const adaptedProducts = data.map(item => ({
            id: item.id.toString(), // Convertimos ID a string para consistencia
            name: item.title,       // Mapeamos title -> name
            price: Number(item.price),
            description: item.description,
            image: item.image
          }));
          
          setProducts(adaptedProducts); 
        } else {
          // --- Opción B: Carga desde JSON Local ---
          // Simulamos un pequeño retraso para ver el spinner de carga
          setProducts(localData);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dataSource]);

  /* ---------------------------------------------------------------
     FUNCIONES CRUD PARA EL ADMINISTRADOR
     Nota: Al no tener Backend real, estas funciones actualizan 
     el estado en memoria de la aplicación (Simulación).
  --------------------------------------------------------------- */

  // 1. Eliminar Producto (Baja)
  const deleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  // 2. Agregar Producto (Alta)
  const addProduct = (newProduct) => {
    // Generamos un ID único basado en la fecha actual
    const productWithId = { ...newProduct, id: Date.now().toString() };
    // Agregamos el nuevo producto al inicio de la lista
    setProducts(prevProducts => [productWithId, ...prevProducts]);
  };

  // 3. Modificar Producto (Update) - NECESARIO PARA EL ADMIN
  const updateProduct = (updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        // Si encontramos el ID coincidente, reemplazamos el objeto completo
        // Si no, dejamos el producto original
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  // Retornamos el Provider con todos los valores y funciones necesarias
  return (
    <ProductContext.Provider value={{ 
      products,         // Lista actual
      loading,          // Estado de carga
      error,            // Estado de error
      dataSource,       // Fuente actual ('api' o 'json')
      setDataSource,    // Función para cambiar fuente
      deleteProduct,    // CRUD: Eliminar
      addProduct,       // CRUD: Agregar
      updateProduct     // CRUD: Editar
    }}>
      {children}
    </ProductContext.Provider>
  );
};