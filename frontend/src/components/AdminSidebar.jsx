import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="space-y-3">

        <Link
          to="/admin"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/cars"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Cars
        </Link>

        <Link
          to="/admin/bookings"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Bookings
        </Link>

        <Link
          to="/admin/users"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Users
        </Link>

      </div>
    </div>
  );
};

export default AdminSidebar;