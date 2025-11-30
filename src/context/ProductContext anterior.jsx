// Maneja el origen de datos (API vs JSON), fetch, estados de carga y CRUD.
// Utilizo  "https://fakestoreapi.com/products" (esta API es pública y siempre funciona), en lugar de MockAPI (da error y no enteramente gratuita) 

import { createContext, useState, useEffect, useContext } from 'react';
import localData from '../services/demo-products.json';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null); 

  // URL estable para pruebas (MockAPI simulation)
  const API_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    if (!dataSource) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        if (dataSource === 'api') {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Error al conectar con API Externa");
          
          const data = await response.json();
          
          // MAPEO DE DATOS: Adaptamos la estructura de la API a la de nuestra app
          // La API devuelve 'title' pero nosotros usamos 'name'
          const adaptedProducts = data.map(item => ({
            id: item.id.toString(),
            name: item.title,       // Mapear title -> name
            price: Number(item.price),
            description: item.description,
            image: item.image       // La API trae imágenes reales
          }));

          setProducts(adaptedProducts); 
        } else {
          // Carga Local JSON
          setTimeout(() => {
            setProducts(localData);
            setLoading(false);
          }, 500);
          return; 
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener la lista de productos. " + err.message);
      } finally {
        if(dataSource === 'api') setLoading(false);
      }
    };

    fetchProducts();
  }, [dataSource]);

  // Funciones CRUD (Estado local)
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setProducts(prev => [productWithId, ...prev]); // Agregamos al principio
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