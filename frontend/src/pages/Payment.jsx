function Payment() {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>💳 Payment</h2>

      <p><b>Car:</b> Toyota Fortuner</p>
      <p><b>Total Amount:</b> ₹7000</p>

      <button style={{ padding: "10px", width: "100%", marginBottom: "10px" }}>
        Pay with UPI
      </button>

      <button style={{ padding: "10px", width: "100%" }}>
        Pay with Card
      </button>

      <p style={{ marginTop: "20px", color: "gray" }}>
        * This is a demo payment page
      </p>
    </div>
  );
}

export default Payment;