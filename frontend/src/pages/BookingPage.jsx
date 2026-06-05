import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
    const { id } = useParams();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ NEW: date states
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/cars/${id}`
                );
                const data = await res.json();
                setCar(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    const handleBooking = () => {
        if (!fromDate || !toDate) {
            alert("Please select booking dates");
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            alert("From date cannot be greater than To date");
            return;
        }

        console.log("Booking Details:", {
            car,
            fromDate,
            toDate,
        });

        alert("Booking successful!");
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (!car) {
        return <p className="text-center mt-10">Car not found</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Booking Page
            </h1>

            <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg">

                {/* Image */}
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-80 object-cover rounded-lg"
                />

                {/* Details */}
                <div>
                    <h2 className="text-2xl font-bold">
                        {car.name}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Category: {car.category}
                    </p>

                    <p className="text-gray-600">
                        Fuel: {car.fuel}
                    </p>

                    <p className="text-gray-600">
                        Seats: {car.seats}
                    </p>

                    <p className="text-green-600 font-bold text-xl mt-4">
                        ₹ {car.pricePerDay} / day
                    </p>
                    {/* 📅 Booking Dates Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">
                            Select Booking Dates
                        </h3>

                        {/* From Date */}
                        <label className="block text-gray-600 mb-1">
                            From Date
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full border p-2 rounded-lg mb-4"
                        />

                        {/* To Date */}
                        <label className="block text-gray-600 mb-1">
                            To Date
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <p
                        className={`mt-2 font-semibold ${car.available ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {car.available ? "Available" : "Not Available"}
                    </p>

                    <button
                        onClick={handleBooking}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;