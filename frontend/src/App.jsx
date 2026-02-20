import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking.jsx";
import Payment from "./pages/Payment.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        {/* <Route path="/confirm_booking" element={<Confirm_Booking />} /> */}
        <Route path="/payment" element={<Payment />} />

      </Routes>
    </>
  );
}

export default App;
