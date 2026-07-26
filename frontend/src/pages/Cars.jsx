
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // 👈 URL params edukkan ithu venam
import axios from "axios";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL-il ulla ?pickupDate=...&dropDate=... edukkunnu
  const [searchParams] = useSearchParams();
  const pickupDate = searchParams.get("pickupDate");
  const dropDate = searchParams.get("dropDate");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        let res;

        // 1. Dates undenghil available cars API vilikkunnu
        if (pickupDate && dropDate) {
          console.log("Fetching available cars for:", pickupDate, "to", dropDate);
          res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/available`, {
            params: { pickupDate, dropDate },
          });
          // Backend available API tarunnath { count: x, cars: [...] } aanu
          setCars(res.data.cars);
        } else {
          // 2. Dates illeghil pazhaya pole ella cars-um kanikkunnu
          console.log("Fetching all cars (No dates selected)");
          res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
          // Backend normal API direct array aayirikkum tharunnath [...]
          setCars(res.data);
        }
      } catch (error) {
        console.log("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [pickupDate, dropDate]); // 👈 Dates maaruhran anusarichu useEffect veendum odum

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading cars...</div>;
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {pickupDate && dropDate ? "Available Cars for Your Dates" : "All Available Cars"}
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No cars available for the selected dates.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;