import Link from "next/link";

const AdminSidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        <li>
          <Link href="/admin/products">Products</Link>
        </li>
        <li>
          <Link href="/admin/orders">Orders</Link>
        </li>
        {/* Add other admin features here */}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
