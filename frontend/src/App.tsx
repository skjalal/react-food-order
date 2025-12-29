import UserProgressContextProvider from "./store/UserProgressContextProvider.tsx";
import CartContextProvider from "./store/CartContextProvider.tsx";
import Header from "./components/Header.tsx";
import Meals from "./components/Meals.tsx";
import Cart from "./components/Cart.tsx";
import Checkout from "./components/Checkout.tsx";
import "./App.css";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
