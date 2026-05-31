
const CarCard = ({ car }) => {
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

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;