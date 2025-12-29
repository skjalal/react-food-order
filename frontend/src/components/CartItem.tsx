import React from "react";

import { currencyFormatter } from "../util/formatting.ts";
import type { CartItemProps } from "../util/data-types.ts";

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) => {
  return (
    <li key={id} className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
