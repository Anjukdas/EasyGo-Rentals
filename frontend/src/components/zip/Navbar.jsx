import { Search } from 'lucide-react'; // For the search icon

const Navbar = () => {
  return (
    <nav className="w-full bg-[#F4F7F9] border-b border-gray-200 px-6 py-4 flex items-center justify-between font-sans">
      
      {/* LEFT: Logo area */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Replace with your actual logo icon / SVG */}
        <div className="w-19 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          EasyGo
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
           Car Rental
        </span>
      </div>

      {/* CENTER: Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
        <a href="#home" className="hover:text-gray-900 transition-colors">Home</a>
        <a href="#cars" className="hover:text-gray-900 transition-colors">Cars</a>
        <a href="#about-footer" className="hover:text-gray-900 transition-colors">About</a>
      </div>

      {/* RIGHT: Search and Actions */}
      <div className="flex items-center space-x-6">
        
        {/* Search Bar Container */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search cars"
            className="w-64 pl-4 pr-10 py-2 bg-transparent border border-gray-300 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" 
          />
        </div>

        {/* List Cars Link */}
        <a 
          href="#list-cars" 
          className="text-gray-600 font-medium hover:text-gray-900 transition-colors hidden sm:inline-block"
        >
          List cars
        </a>

        {/* Sign Up Button */}
        <button className="bg-[#2B6CB0] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-sm">
          Sign up
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;