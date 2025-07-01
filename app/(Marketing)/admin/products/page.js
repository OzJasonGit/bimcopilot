"use client";
import Sidebar from "@/components/Sidebar/sidebar";
import Header from "@/components/Header/Header";
import Product_Management from "@/components/Product_Management/product_management";

const ProductPage = () => {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Sidebar & Main Content */}
      <div className="flex">
        {/* Sidebar with top padding to stay below header */}
        <div className="w-64 pt-28 fixed h-full bg-gray-900 text-white">
          <Sidebar />
        </div>

        {/* Main content with left margin to avoid overlapping the sidebar */}
        <main className="ml-64 p-6 w-full pt-24">
        <Product_Management/>
        </main>
      </div>
    </>
  );
};

export default ProductPage;