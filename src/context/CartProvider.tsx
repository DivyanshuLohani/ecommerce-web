"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import type { Product } from "@prisma/client";
import { CartItem } from "@/lib/cart";

interface CartContextState {
  products: { product: Product; quantity: number }[];
  addProduct: (p: Product, qty: number) => void;
  removeProduct: (id: number, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  clear: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextState | null>(null);

const CartProvider: React.FC<{
  children: ReactNode;
  cartData?: CartItem[];
  addProductToCart?: any;
  removeProductFromCart?: any;
  clearCart?: any;
}> = ({
  children,
  cartData,
  addProductToCart,
  removeProductFromCart,
  clearCart,
}) => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    () => cartData ?? []
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach(
      (crr) =>
        (total +=
          (crr.product.discountedPrice
            ? crr.product.discountedPrice
            : crr.product.price) * crr.quantity)
    );
    setCartTotal(total);

    // Weird bug starts to make infinite requests to the server
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const addProduct = (product: Product, qty: number) => {
    addProductToCart(product, qty);
    setCartOpen(true);
    setCart((prevCart) => {
      const productExists = prevCart.find((p) => p.product.id === product.id);
      if (productExists) {
        return prevCart.map((p) => {
          return p.product.id === product.id
            ? { ...p, quantity: p.quantity + qty }
            : p;
        });
      } else {
        return [...prevCart, { product, quantity: qty }];
      }
    });
  };

  const removeProduct = (id: number, qty: number) => {
    removeProductFromCart(id, qty);
    setCart((prevCart) => {
      const productExists = prevCart.find((p) => p.product.id === id);
      if (productExists) {
        // If the quantity to remove is less than the current quantity
        if (productExists.quantity > qty) {
          return prevCart.map((p) =>
            p.product.id === id ? { ...p, quantity: p.quantity - qty } : p
          );
        } else {
          return prevCart.filter((p) => p.product.id !== id);
        }
      }
      return prevCart;
    });
  };

  const clear = () => {
    setCart([]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        products: cart,
        addProduct,
        removeProduct,
        clear,
        cartOpen,
        setCartOpen,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
