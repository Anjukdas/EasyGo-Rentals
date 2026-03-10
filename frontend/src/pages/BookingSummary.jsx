import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BookingSummary() {
  const { id } = useParams(); // booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p>Loading booking...</p>;
  if (!booking || !booking.car) return <p>Booking or car details not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking Confirmed ✅</h2>

      <img src={booking.car.image} alt={booking.car.name} width="300" style={{ borderRadius: "10px" }} />
      <h3>Car: {booking.car.name}</h3>
      <p>Category: {booking.car.category}</p>
      <p>Fuel: {booking.car.fuel}</p>
      <p>Seats: {booking.car.seats}</p>

      <hr />

      <h3>Your Trip</h3>
      <p>Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()}</p>
      <p>Drop Date: {new Date(booking.dropDate).toLocaleDateString()}</p>
      <p>Total Price: ₹{booking.totalPrice}</p>
      <p>Payment Status: {booking.paymentStatus}</p>
    </div>
  );
}

export default BookingSummary;