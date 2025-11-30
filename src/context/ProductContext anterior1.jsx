import { createContext, useState, useEffect, useContext } from 'react';
import localData from '../services/demo-products.json';

// 1. Creación del Contexto
const ProductContext = createContext();

// 2. EXPORTACIÓN DEL HOOK (Esta es la línea que te faltaba)
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

// 3. Proveedor del Contexto
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Inicializamos en 'api' para carga inmediata
  const [dataSource, setDataSource] = useState('api'); 

  const API_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        if (dataSource === 'api') {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Error al conectar con API Externa");
          
          const data = await response.json();
          
          // Mapeo de datos (FakeStoreAPI -> Nuestra App)
          const adaptedProducts = data.map(item => ({
            id: item.id.toString(),
            name: item.title,
            price: Number(item.price),
            description: item.description,
            image: item.image
          }));
          
          setProducts(adaptedProducts); 
        } else {
          // Carga JSON Local
          // Simulamos pequeño delay para consistencia visual
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

  // Funciones CRUD
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = (updatedProduct) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  }

  return (
    <ProductContext.Provider value={{ 
      products, loading, error, dataSource, setDataSource, 
      deleteProduct, addProduct, updateProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};