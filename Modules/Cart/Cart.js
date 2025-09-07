"use client"


import Cart from "@/components/Cart/Cart";
import Sides from "../../components/Sides/sides";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menu from "../Menu/menu";


const CartModule = () => {
    return (
      <>
        <Menu/>
        <Header/>
        <Sides/>
        <Cart/>

        <Footer/>

      </>
    );
  };
  
export default CartModule;