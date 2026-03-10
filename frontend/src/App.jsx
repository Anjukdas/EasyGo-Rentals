import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingSummary from "./pages/BookingSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/cars"
        element={
          <ProtectedRoute>
            <Cars />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/:carId"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route path="/booking-summary/:id" element={<BookingSummary />} />
    </Routes>
    

  );
}

export default App;