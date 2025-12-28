import React from "react";

import Button from "./UI/Button.tsx";
import logoImg from "../assets/logo.jpg";

const Header: React.FC = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
};

export default Header;
