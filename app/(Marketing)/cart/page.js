"use client"

import Cart from "@/components/Cart/Cart";
import { CartProvider } from "@/components/Context/CartContext";

const CartPage = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    )
}
export default CartPage;