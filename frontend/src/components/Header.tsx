import React from "react";

import Button from "./UI/Button.tsx";
import logoImg from "../assets/logo.jpg";
import { useCart } from "../store/CartContext.tsx";
import { useUserProgress } from "../store/UserProgressContext.tsx";

const Header: React.FC = () => {
  const { items } = useCart();
  const { showCart } = useUserProgress();
  const totalCartItems = items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity!,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={showCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
