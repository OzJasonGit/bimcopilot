"use client";

import Users from "@/components/Users/users";
import Sidebar from "@/components/Sidebar/sidebar";
import Header from "@/components/Header/Header";

const UserPage = () => {
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
          <Users />
        </main>
      </div>
    </>
  );
};

export default UserPage;