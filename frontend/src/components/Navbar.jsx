// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           CarRental
//         </Link>

//         {/* Menu */}
//         <div className="flex gap-6">
//           <Link to="/" className="hover:text-blue-600">
//             Home
//           </Link>

//           <Link to="/cars" className="hover:text-blue-600">
//             Cars
//           </Link>

//           <Link to="/bookings" className="hover:text-blue-600">
//             My Bookings
//           </Link>
//         </div>

//         {/* Auth Buttons */}
//         <div className="flex gap-3">
//           <Link
//             to="/login"
//             className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowDropdown(false);

    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          CarRental
        </Link>

        {/* Menu */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/cars" className="hover:text-blue-600">
            Cars
          </Link>

          {user && (
            <Link
              to="/bookings"
              className="hover:text-blue-600"
            >
              My Bookings
            </Link>
          )}
        </div>

        {/* Auth Section */}
        {!user ? (
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
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
            >
              <FaUserCircle size={28} className="text-blue-600" />

              <span className="font-medium text-gray-700">
                {user?.name?.split(" ")[0]}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-4 border">

                <h3 className="font-semibold text-lg">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

                <hr className="my-3" />


                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left py-2 hover:text-blue-600"
                >
                  Edit Profile
                </button>

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
    </nav>
  );
};

export default Navbar;