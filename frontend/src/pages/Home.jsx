import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Convert dates to ISO strings before saving
    const pickupISO = new Date(pickupDate).toISOString();
    const returnISO = new Date(returnDate).toISOString();
    

    localStorage.setItem("location", location);
    // localStorage.setItem("pickupDate", pickupISO);
    // localStorage.setItem("returnDate", returnISO);
    localStorage.setItem("pickupDate", new Date(pickupISO).toISOString());
localStorage.setItem("returnDate", new Date(returnISO).toISOString());

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

        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
          Pick Your Wheels
        </button>
      </form>
    </div>
  );
}

export default Home;