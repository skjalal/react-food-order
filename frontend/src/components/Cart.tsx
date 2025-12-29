import React from "react";

import { useCart } from "../store/CartContext.tsx";
import Modal from "./UI/Modal.tsx";
import Button from "./UI/Button.tsx";
import CartItem from "./CartItem.tsx";
import { useUserProgress } from "../store/UserProgressContext.tsx";
import { currencyFormatter } from "../util/formatting.ts";

const Cart: React.FC = () => {
  const { items, addItem, removeItem } = useCart();

  const { progress, hideCart, showCheckout } = useUserProgress();

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity! * +item.price,
    0
  );

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : undefined}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button textOnly={false} onClick={showCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
