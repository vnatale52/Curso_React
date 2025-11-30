// Lógica del carrito de compras.

import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto (agrupa por ID incrementando cantidad)
  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remover producto (disminuir cantidad o eliminar)
  const removeFromCart = (id, removeAll = false) => {
    setCart(prevCart => {
      if (removeAll) return prevCart.filter(item => item.id !== id);
      
      return prevCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Calcular total
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};