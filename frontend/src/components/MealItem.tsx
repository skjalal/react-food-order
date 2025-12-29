import React from "react";

import Button from "./UI/Button.tsx";
import { currencyFormatter } from "../util/formatting.ts";
import type { MealItemProps } from "../util/data-types.ts";
import { useCart } from "../store/CartContext.tsx";

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const { addItem } = useCart();
  const handleAddMealToCart = (): void => {
    addItem(meal);
  };

  const { id, name, image, price, description } = meal;
  const imagePath = "http://localhost:3000/" + image;
  const priceValue = currencyFormatter.format(+price);
  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={imagePath} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{priceValue}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart} textOnly={false}>
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
