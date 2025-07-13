"use client";

import CartModule from "@/Modules/Cart/Cart";
import { CartProvider } from "@/components/Context/CartContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Menu from "@/components/Menu/menu";

const CartPage = () => {
  return (
    <CartProvider>
      <>
        <Menu className="fixed top-0 left-0 w-full z-[9999]" />
        <Header className="fixed top-[60px] left-0 w-full z-[9998]" />
        
        {/* Cart starts after Menu + Header */}
        <div className="pt-[75px] bg-[#151515] relative z-0">
          <CartModule />
        </div>

        <Footer />
      </>
    </CartProvider>
  );
};

export default CartPage;
