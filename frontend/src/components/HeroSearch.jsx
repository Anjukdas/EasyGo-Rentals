import { MapPin, CalendarDays, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCapsule() {
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

  const handleSearch = () => {
    if (!pickupDate || !dropDate) {
      alert("Please select dates");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to see available cars!");

      navigate(`/login?redirect=/cars?pickupDate=${pickupDate}&dropDate=${dropDate}`);
      return;
    }


    navigate(`/cars?pickupDate=${pickupDate}&dropDate=${dropDate}`);

  };

  return (
    <div className="flex justify-center mt-10 px-4">

      {/* CAPSULE */}
      <div className="
    bg-white
    shadow-lg
    rounded-3xl
    min-[700px]:rounded-full
    px-5
    py-5
    min-[700px]:px-6
    min-[700px]:py-4
    w-full
    max-w-5xl
    flex
    flex-col
    min-[700px]:flex-row
    items-stretch
    min-[700px]:items-center
    gap-4
    min-[700px]:gap-6
  ">

        {/* Pickup Location */}
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="text-blue-600" size={18} />
          <div>
            <p className="text-xs text-gray-500">Pickup Location</p>
            <input
              type="text"
              placeholder="Bangalore"
              className="outline-none text-sm"
            />
          </div>
        </div>

        {/* Pickup Date */}
        <div className="flex items-center gap-2 flex-1">
          <CalendarDays className="text-blue-600" size={18} />
          <div>
            <p className="text-xs text-gray-500">Pick-up Date</p>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex items-center gap-2 flex-1">
          <CalendarDays className="text-blue-600" size={18} />
          <div>
            <p className="text-xs text-gray-500">Return Date</p>
            <input
              type="date"
              value={dropDate}
              onChange={(e) => setDropDate(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 w-full min-[700px]:w-auto shrink-0">
          <Search size={18} />
          Search
        </button>

      </div>
    </div>

  );
}
