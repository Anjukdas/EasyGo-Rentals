
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading,setBookingLoading ] = useState(false);

  // ✅ Read pickup & return dates from localStorage
  const pickupDate = localStorage.getItem("pickupDate");
  const returnDate = localStorage.getItem("returnDate");


  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        console.log("Fetch car error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  // Booking API call
 const handleBooking = async () => {
  if (!pickupDate || !returnDate) {
    alert("Pickup and Return dates missing.");
    return;
  }

  try {
    setBookingLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    console.log("Booking payload:", {
      carId,
      pickupDate,
      returnDate
    });

    const res = await axios.post(
      "http://localhost:5000/api/bookings",
      {
        carId: carId,
        pickupDate: new Date(pickupDate).toISOString(),
        dropDate: new Date(returnDate).toISOString(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Booking success:", res.data);

    const bookingId = res.data.booking._id;

    console.log("Booking ID:", bookingId);

    // ✅ correct redirect
    navigate(`/booking-summary/${bookingId}`);

  } catch (err) {
    console.log("Booking Failed:", err.response?.data || err);
    alert(`Booking Failed: ${err.response?.data?.message || "Unknown error"}`);
  } finally {
    setBookingLoading(false);
  }
};

  if (loading) return <p>Loading car details...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking Page</h2>

      <img src={car.image} alt={car.name} width="300" style={{ borderRadius: "10px" }} />
      <h3>{car.name}</h3>
      <p>Category: {car.category}</p>
      <p>Fuel: {car.fuel}</p>
      <p>Seats: {car.seats}</p>
      <p>Price per day: ₹{car.pricePerDay}</p>

      <hr />

      <h3>Your Trip</h3>
      <p>
        Pickup Date: {pickupDate ? new Date(pickupDate).toLocaleDateString() : "Not selected"}
      </p>
      <p>
        Return Date: {returnDate ? new Date(returnDate).toLocaleDateString() : "Not selected"}
      </p>

      <button
        onClick={handleBooking}
        disabled={bookingLoading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {bookingLoading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}

export default Booking;