import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

const Cars = () => {
  console.log('carsss')
  const [cars, setCars] = useState([]);


  useEffect(() => {
    const fetchCars = async () => {
      console.log('carsss1')
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
         console.log('carsss2')
        console.log(res.data);
        setCars(res.data);
      } catch (error) {
  console.log("Error fetching cars:", error);
  console.log(error.response);
  console.log(error.message);
}
    };

    fetchCars();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Cars
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Cars;