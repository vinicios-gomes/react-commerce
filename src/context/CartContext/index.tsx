import React, { createContext, useState } from "react";
import { IProduct } from "../../pages/product/IProduct";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  function handleAddProductToCart(product: IProduct) {
    setCart([...cart, product]);
  }

  function handleRemoveProductFromCart(product: IProduct) {
    const filteredCart = cart.filter(
      (cartItem: IProduct) => cartItem.id !== product.id
    );

    setCart(filteredCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
