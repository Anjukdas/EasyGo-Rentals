import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
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
import Dashboard from "./pages/admin/Dashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";





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
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="cars" element={<AdminCars />} />
  <Route path="/admin/users" element={<AdminUsers />}/>
  <Route path="bookings"  element={<AdminBookings />} />
</Route>

        


        

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;