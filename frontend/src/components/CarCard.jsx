
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();



   const handleBookNow = () => {
     console.log("Car object:", car);
  console.log("Car ID:", car._id);
    navigate(`/booking/${car._id}`);
  };  
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={`${car.image}`}
        alt={car.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{car.name}</h2>

        <p className="text-gray-600">
          Brand: {car.category}
        </p>

        <p className="text-blue-600 font-semibold mt-2">
          ₹ {car.pricePerDay} / day
        </p>

        <button onClick={handleBookNow}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;