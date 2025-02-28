"use client";
import Admin from "@/Modules/Admin/admin";
import Sidebar from "@/components/Sidebar/sidebar";
import Header from "@/components/Header/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-64 pt-28 fixed h-full bg-gray-900 text-white">
          <Sidebar />
        </div>
        <main className="ml-64 p-6 w-full pt-24">
          <Admin />
        </main>
      </div>
    </>
  );
}
