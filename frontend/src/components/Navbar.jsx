import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowDropdown(false);
    setMobileMenuOpen(false);

    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-2xl font-bold text-blue-600"
        >
          CarRental
        </Link>


        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden md:flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/cars"
            className="hover:text-blue-600"
          >
            Cars
          </Link>

          {/* Normal User */}
          {user && !isAdmin && (
            <Link
              to="/my-bookings"
              className="hover:text-blue-600"
            >
              My Bookings
            </Link>
          )}

          {/* Admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className="hover:text-blue-600 font-semibold"
            >
              Admin Panel
            </Link>
          )}

        </div>


        {/* ================= DESKTOP AUTH ================= */}

        <div className="hidden md:block">

          {!user ? (

            <div className="flex gap-3">

              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>

            </div>

          ) : (

            <div className="relative">

              <button
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >

                <FaUserCircle
                  size={28}
                  className="text-blue-600"
                />

                <span className="font-medium text-gray-700">
                  {user?.name?.split(" ")[0]}
                </span>

              </button>


              {/* PROFILE DROPDOWN */}

              {showDropdown && (

                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-4 border">

                  <h3 className="font-semibold text-lg">
                    {user?.name}
                  </h3>

                  <p className="text-sm text-gray-500 break-all">
                    {user?.email}
                  </p>

                  <hr className="my-3" />

                  {!isAdmin && (
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left py-2 hover:text-blue-600"
                    >
                      Edit Profile
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:text-red-600 py-2"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>


        {/* ================= MOBILE HAMBURGER ================= */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="md:hidden text-2xl text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (

        <div className="md:hidden bg-white border-t shadow-lg px-6 py-5">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/cars"
              onClick={closeMobileMenu}
              className="hover:text-blue-600"
            >
              Cars
            </Link>


            {/* NORMAL USER */}

            {user && !isAdmin && (

              <Link
                to="/my-bookings"
                onClick={closeMobileMenu}
                className="hover:text-blue-600"
              >
                My Bookings
              </Link>

            )}


            {/* ADMIN */}

            {isAdmin && (

              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="hover:text-blue-600 font-semibold"
              >
                Admin Panel
              </Link>

            )}


            <hr />


            {/* NOT LOGGED IN */}

            {!user ? (

              <div className="flex flex-col gap-3">

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-center px-4 py-2 border border-blue-600 rounded-lg text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Register
                </Link>

              </div>

            ) : (

              /* LOGGED IN USER */

              <div>

                <div className="flex items-center gap-3 mb-4">

                  <FaUserCircle
                    size={32}
                    className="text-blue-600"
                  />

                  <div className="min-w-0">

                    <p className="font-semibold">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 break-all">
                      {user?.email}
                    </p>

                  </div>

                </div>


                {!isAdmin && (

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/profile");
                    }}
                    className="w-full text-left py-2 hover:text-blue-600"
                  >
                    Edit Profile
                  </button>

                )}


                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-500 hover:text-red-600"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;