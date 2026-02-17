const cars = [
  {
    id: 1,
    name: "Toyota Fortuner",
    category: "SUV",
    price: 3500,
  },
  {
    id: 2,
    name: "Hyundai Verna",
    category: "Sedan",
    price: 2500,
  },
  {
    id: 3,
    name: "Maruti Swift",
    category: "Hatchback",
    price: 1800,
  },
];

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Car Rental</h1>

      {cars.map((car) => (
        <div
          key={car.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{car.name}</h3>
          <p>Category: {car.category}</p>
          <p>Price per day: ₹{car.price}</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
}
