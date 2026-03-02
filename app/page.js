"use client";
import Main from "../Modules/Main/main";
import { CartProvider } from "@/components/Context/CartContext";


const Home = () => {
  return (
    <> 
      <CartProvider>
        <Main />
      </CartProvider>
    </>
  );
};

export default Home;
