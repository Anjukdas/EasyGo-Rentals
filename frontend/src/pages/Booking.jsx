function Booking() {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>🚗 Booking Details</h2>

      <p><b>Car:</b> Toyota Fortuner</p>
      <p><b>Price per day:</b> ₹3500</p>

      <label>Pickup Date</label>
      <input type="date" />

      <br /><br />

      <label>Drop Date</label>
      <input type="date" />

      <br /><br />

      <h3>Total Price: ₹7000</h3>

      <a href="/payment">
        <button style={{ padding: "10px 20px" }}>
          Proceed to Payment
        </button>
      </a>
    </div>
  );
}

export default Booking;