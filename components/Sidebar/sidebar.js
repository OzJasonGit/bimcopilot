import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#151515] text-white fixed left-0  p-4">
      <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/admin">
              <span className="block px-4 py-2 rounded hover:bg-gray-700">Stories</span>
            </Link>
          </li>
           <li className="mb-2">
            <Link href="/admin/products">
              <span className="block px-4 py-2 rounded hover:bg-gray-700">Products</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/users">
              <span className="block px-4 py-2 rounded hover:bg-gray-700">Users</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/orders">
              <span className="block px-4 py-2 rounded hover:bg-gray-700">Orders</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/settings">
              <span className="block px-4 py-2 rounded hover:bg-gray-700">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
