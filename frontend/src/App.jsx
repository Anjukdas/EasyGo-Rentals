import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import BookingPage from "./pages/BookingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ConfirmBooking from "./pages/ConfirmBooking"
import PaymentSuccess from "./pages/PaymentSuccess";
import MyBookings from "./pages/MyBookings";





import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;