import { MapPin, CalendarDays, Search } from "lucide-react";

export default function SearchCapsule() {
  return (
    <div className="flex justify-center mt-10 px-4">
      
      {/* CAPSULE */}
      <div className="bg-white shadow-lg rounded-full px-6 py-4 w-100% max-w-5xl flex flex-col md:flex-row items-center gap-4">

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
              className="outline-none text-sm"
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
              className="outline-none text-sm"
            />
          </div>
        </div>

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2">
          <Search size={18} />
          Search
        </button>

      </div>
    </div>
  );
}