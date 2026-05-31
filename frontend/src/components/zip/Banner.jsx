const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* THE BIG BLUE BOX: We use a beautiful gradient background */}
      <div className="w-full bg-gradient-to-r from-[#0052FF] to-[#6094FF] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-xl text-white">
        
        {/* LEFT SIDE: Text and Button */}
        <div className="max-w-xl space-y-4 z-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Do You Own a Luxury Car?
          </h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Monetize your vehicle effortlessly by listing it on CarRental. 
            We take care of insurance, driver verification, and secure payments — so you can earn passive income, stress-free.
          </p>
          <button className="bg-white text-[#0052FF] font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md mt-2">
            List your car
          </button>
        </div>

        {/* RIGHT SIDE: The White BMW Car */}
        <div className="mt-8 md:mt-0 w-full md:w-1/2 max-w-md z-10">
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" 
            alt="White Luxury Car" 
            className="w-full h-auto object-contain mx-auto drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;