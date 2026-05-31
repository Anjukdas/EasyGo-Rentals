import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CarRental
        </Link>

        {/* Menu */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/cars" className="hover:text-blue-600">
            Cars
          </Link>

          <Link to="/bookings" className="hover:text-blue-600">
            My Bookings
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;