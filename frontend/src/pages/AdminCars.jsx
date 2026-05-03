import { useEffect, useState } from "react";
import axios from "axios";

function AdminCars() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchCars();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard - Cars</h2>

      {cars.map((car) => (
        <div key={car._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{car.name}</h3>
          <p>Category: {car.category}</p>
          <p>Price: ₹{car.pricePerDay}</p>

          <button onClick={() => deleteCar(car._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminCars;