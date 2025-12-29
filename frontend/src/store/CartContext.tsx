import { createContext, useContext } from "react";
import type { CartContextProps, Meal } from "../util/data-types.ts";

const defaultAddItem = (item: Meal) => {
  console.log("Default function invoke: " + item.id);
};

const defaultRemoveItem = (id: string) => {
  console.log("Default function invoke: " + id);
};

export const CartContext = createContext<CartContextProps>({
  items: [],
  addItem: defaultAddItem,
  removeItem: defaultRemoveItem,
  clearCart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
