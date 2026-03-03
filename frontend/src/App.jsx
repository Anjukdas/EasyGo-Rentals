import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

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
    </Routes>
  );
}

export default App;