import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save search data temporarily
    localStorage.setItem("location", location);
    localStorage.setItem("pickupDate", pickupDate);
    localStorage.setItem("returnDate", returnDate);

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/cars");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Find Your Perfect Ride 🚗</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Pickup Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Pick Your Wheels</button>
      </form>
    </div>
  );
}

export default Home;