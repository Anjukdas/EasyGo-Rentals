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

    const carsUrl =
      `/cars?pickupDate=${pickupDate}&dropDate=${dropDate}`;

    if (!token) {
      alert("Please login to see available cars!");

      navigate(
        `/login?redirect=${encodeURIComponent(carsUrl)}`
      );

      return;
    }

    navigate(carsUrl);
  };

  return (
    <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6">

      <div className="
        bg-white
        shadow-xl
        rounded-3xl
        min-[850px]:rounded-full

        p-5
        min-[850px]:px-6
        min-[850px]:py-4

        w-full
        max-w-5xl

        flex
        flex-col
        min-[850px]:flex-row

        items-stretch
        min-[850px]:items-center

        gap-4
        min-[850px]:gap-5
      ">

        {/* LOCATION */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          <MapPin
            className="text-blue-600 shrink-0"
            size={18}
          />

          <div className="w-full min-w-0">

            <p className="text-xs text-gray-500">
              Pickup Location
            </p>

            <input
              type="text"
              placeholder="Bangalore"
              className="
                w-full
                min-w-0
                outline-none
                text-sm
                bg-transparent
              "
            />

          </div>
        </div>


        {/* PICKUP DATE */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          <CalendarDays
            className="text-blue-600 shrink-0"
            size={18}
          />

          <div className="w-full min-w-0">

            <p className="text-xs text-gray-500">
              Pick-up Date
            </p>

            <input
              type="date"
              value={pickupDate}
              onChange={(e) =>
                setPickupDate(e.target.value)
              }
              className="
                w-full
                min-w-0
                outline-none
                bg-transparent
              "
            />

          </div>
        </div>


        {/* RETURN DATE */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          <CalendarDays
            className="text-blue-600 shrink-0"
            size={18}
          />

          <div className="w-full min-w-0">

            <p className="text-xs text-gray-500">
              Return Date
            </p>

            <input
              type="date"
              value={dropDate}
              onChange={(e) =>
                setDropDate(e.target.value)
              }
              className="
                w-full
                min-w-0
                outline-none
                bg-transparent
              "
            />

          </div>
        </div>


        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white

            px-6
            py-3
            rounded-full

            flex
            items-center
            justify-center
            gap-2

            w-full
            min-[850px]:w-auto

            shrink-0
            transition
          "
        >
          <Search size={18} />
          Search
        </button>

      </div>

    </div>
  );
}