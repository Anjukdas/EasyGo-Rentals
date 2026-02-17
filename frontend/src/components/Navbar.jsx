import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">🚗 CarRental</div>

      <div className={`nav-links ${open ? "show" : ""}`}>
        <NavLink to="/" end onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/login" onClick={() => setOpen(false)}>
          Login
        </NavLink>
        <NavLink to="/register" onClick={() => setOpen(false)}>
          Register
        </NavLink>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}


export default Navbar;
