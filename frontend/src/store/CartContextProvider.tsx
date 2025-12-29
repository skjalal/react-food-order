import React, { useReducer, type PropsWithChildren } from "react";

import { CartContext } from "./CartContext.tsx";
import type {
  CartContextProps,
  CartState,
  CartReducerAction,
  Meal,
} from "../util/data-types.ts";

const cartReducer = (state: CartState, action: CartReducerAction) => {
  const { items } = state;
  const { type, item, id } = action;
  const updatedItems = [...items];
  if (type === "ADD_ITEM") {
    const existingCartItemIndex = items.findIndex((i) => i.id === item!.id);
    if (existingCartItemIndex > -1) {
      const existingItem = items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity! + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...item!, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (type === "REMOVE_ITEM") {
    const existingCartItemIndex = items.findIndex((i) => i.id === id!);
    const existingItem = items[existingCartItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity! - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
};

const CartContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, dispactCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Meal): void => {
    dispactCartAction({
      type: "ADD_ITEM",
      item,
    });
  };

  const removeItem = (id: string): void => {
    dispactCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  };

  const clearCart = () => {
    dispactCartAction({ type: "CLEAR_CART" });
  };

  const ctxValue: CartContextProps = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return <CartContext value={ctxValue}>{children}</CartContext>;
};

export default CartContextProvider;
