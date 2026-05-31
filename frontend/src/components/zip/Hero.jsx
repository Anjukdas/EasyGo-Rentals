import { Search, ChevronDown } from 'lucide-react'; // We need these icons!

const Hero = () => {
  return (
    // THE WHOLE STAGE: A big box with a nice soft background color
    <div className="w-full bg-[#F4F7F9] pt-16 pb-20 px-4 flex flex-col items-center justify-center text-center">
      
      {/* 1. THE BIG TEXT */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-10">
        Embrace wherever the road takes you
      </h1>

      {/* 2. THE MAGIC FLOATING BOX (The Search Bar Capsule) */}
      <div className="w-full max-w-4xl bg-white rounded-full shadow-lg p-3 md:pl-8 md:pr-3 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-12">
        
        {/* Item A: Pickup Location */}
        <div className="flex flex-col text-left cursor-pointer px-4">
          <div className="flex items-center text-sm font-semibold text-gray-500">
            <span>Pickup Location</span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
          </div>
          <span className="text-base text-gray-400 font-medium mt-0.5">Bangalore</span>
        </div>

        {/* Little Divider Line (Only shows on laptop screens) */}
        <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

        {/* Item B: Pick-up Date */}
        <div className="flex flex-col text-left cursor-pointer px-4">
          <div className="flex items-center text-sm font-semibold text-gray-500">
            <span>Pick-up Date</span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
          </div>
          <span className="text-base text-gray-400 font-medium mt-0.5">28-Mar 2025</span>
        </div>

        {/* Little Divider Line */}
        <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

        {/* Item C: Return Date */}
        <div className="flex flex-col text-left cursor-pointer px-4">
          <div className="flex items-center text-sm font-semibold text-gray-500">
            <span>Return Date</span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
          </div>
          <span className="text-base text-gray-400 font-medium mt-0.5">30-Mar 2025</span>
        </div>

        {/* Item D: The Blue Search Button */}
        <button className="w-full md:w-auto bg-[#2B6CB0] hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm">
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

      </div>

      {/* 3. THE SHINY CAR IMAGE */}
      <div className="w-full max-w-3xl px-4">
        {/* Replace this URL with your local car picture path later if you want! */}
        <img 
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000" 
          alt="Silver Luxury Car" 
          className="w-full h-auto object-contain mx-auto mix-blend-multiply"
        />
      </div>

    </div>
  );
};

export default Hero;