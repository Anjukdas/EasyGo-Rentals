import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import BookingPage from "./pages/BookingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";



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

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;