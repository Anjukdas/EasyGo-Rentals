
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cars() {
  const [cars, setCars] = useState([]);   // store cars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        console.log(res.data);  // see what backend returns
        setCars(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Cars 🚗</h2>

      {cars.length === 0 ? (
        <p>No cars available</p>
      ) : (
        cars.map((car) => (
          <div
            key={car._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h3>{car.name}</h3>
            <p>Price per day: ₹{car.pricePerDay}</p>
            <button onClick={() => navigate(`/booking/${car._id}`)}>
              Book Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cars;