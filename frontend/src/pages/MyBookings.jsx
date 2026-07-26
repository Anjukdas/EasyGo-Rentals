import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/bookings/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setBookings(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading bookings...</p>;
    }
    const totalBookings = bookings.length;
    const paidBookings = bookings.filter(
        (b) => b.paymentStatus === "Paid"
    ).length;

    const pendingBookings = bookings.filter(
        (b) => b.paymentStatus === "Pending"
    ).length;

const handlePayNow = async (bookingId) => {
try {
const token =
localStorage.getItem("token");

const res =
await fetch(
`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/pay-session`,
{
method: "POST",

headers: {
Authorization:
`Bearer ${token}`,
},
}
);

console.log(res.status);

const data =
await res.json();

console.log(data);

if (data.stripeUrl) {
window.location.href =
data.stripeUrl;
}

} catch (err) {
console.log(err);

alert("Unable to continue payment");
}
};

    return (



        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mt-14 mb-3">
                <h3 className="text-2xl font-extrabold text-gray-800">
                    My Booking Dashboard
                </h3>
                <p className="text-gray-500 mt-2">
                    View all your car rental bookings in one place
                </p>
            </div>

            {/* Summary Card */}
            <div className="flex justify-center mb-6">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    {/* Total */}
                    <div className="bg-white shadow-md rounded-xl p-5 text-center border">
                        <p className="text-gray-500">Total Bookings</p>
                        <h2 className="text-3xl font-bold text-blue-600">
                            {totalBookings}
                        </h2>
                    </div>

                    {/* Paid */}
                    <div className="bg-white shadow-md rounded-xl p-5 text-center border">
                        <p className="text-gray-500">Paid Bookings</p>
                        <h2 className="text-3xl font-bold text-green-600">
                            {paidBookings}
                        </h2>
                    </div>

                    {/* Pending */}
                    <div className="bg-white shadow-md rounded-xl p-5 text-center border">
                        <p className="text-gray-500">Pending Bookings</p>
                        <h2 className="text-3xl font-bold text-red-500">
                            {pendingBookings}
                        </h2>
                    </div>

                </div>
            </div>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">
                    No bookings found
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">

                        {/* Table Header */}
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Car</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">From</th>
                                <th className="p-3 text-left">To</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {bookings.map((b) => (
                                <tr
                                    key={b._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    {/* Car */}
                                    <td className="p-3 flex items-center gap-3">
                                        <img
                                            src={b.car?.image}
                                            alt={b.car?.name}
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                        <span className="font-semibold">
                                            {b.car?.name}
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td className="p-3">
                                        {b.car?.category}
                                    </td>

                                    {/* From */}
                                    <td className="p-3">
                                        {new Date(b.pickupDate).toLocaleDateString()}
                                    </td>

                                    {/* To */}
                                    <td className="p-3">
                                        {new Date(b.dropDate).toLocaleDateString()}
                                    </td>

                                    {/* Price */}
                                    <td className="p-3 font-bold text-blue-600">
                                        ₹ {b.totalPrice}
                                    </td>

                                    {/* Status */}
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${b.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {b.paymentStatus}
                                        </span>

                                        {/* 👉 PAY NOW BUTTON ONLY FOR PENDING */}
                                        {b.paymentStatus === "Pending" && (
                                            <button
                                                onClick={() =>
                                                    handlePayNow(b._id)
                                                }
                                                className="ml-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                            >
                                                PAYNOW
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookings;