import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import "../css/Home.css";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cars");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="home-container">
      <h1>Available Cars</h1>

      <div className="cars-grid">
        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
}

export default Home;
