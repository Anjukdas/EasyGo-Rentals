import "../css/CarCard.css";

function CarCard({ car }) {
  console.log("IMAGE URL 👉", car.image); // IMPORTANT

  return (
    <div className="car-card">
      <div className="car-image">
        <img
          src={car.image}
          alt={car.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>

      <div className="car-info">
        <h3>{car.name}</h3>
        <p>Category: {car.category}</p>
        <p>Fuel: {car.fuel}</p>
        <p>Seats: {car.seats}</p>
        <h4>₹{car.pricePerDay} / day</h4>
        <button>Book Now</button>
      </div>
    </div>
  );
}


export default CarCard;
