import { useLocation, useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { car, fromDate, toDate, totalPrice } =
        location.state || {};

    if (!car) {
        return (
            <p className="text-center mt-10 text-gray-500">
                No booking data found
            </p>
        );
    }
    const handlePayNow = async () => {
        try {

            const token =
                localStorage.getItem("token");

            const res =
                await fetch(
                    "http://localhost:5000/api/bookings",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body:
                            JSON.stringify({
                                carId:
                                    car._id,

                                pickupDate:
                                    fromDate,

                                dropDate:
                                    toDate
                            })
                    }
                );

            const data =
                await res.json();

            if (data.stripeUrl) {
                window.location.href =
                    data.stripeUrl;
            }

        }
        catch (err) {

            alert(
                "Booking failed"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden">

                {/* Image */}
                <img
                    src={car.image}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800">
                        {car.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {car.category} • {car.fuel} • {car.seats} Seats
                    </p>

                    {/* Dates Box */}
                    <div className="mt-5 bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-700">
                            📅 From: <b>{fromDate}</b>
                        </p>
                        <p className="text-gray-700">
                            📅 To: <b>{toDate}</b>
                        </p>
                    </div>

                    {/* Price */}
                    <div className="mt-5 text-center">
                        <p className="text-gray-500">Total Amount</p>
                        <h1 className="text-3xl font-bold text-blue-600">
                            ₹ {totalPrice}
                        </h1>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 space-y-3">

                        <button
                            onClick={handlePayNow}
                            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
                        >
                            Pay Now
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl"
                        >
                            Back
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConfirmBooking;