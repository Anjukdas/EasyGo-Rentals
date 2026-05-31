import { Star } from 'lucide-react'; // For the review stars

const Testimonials = () => {
  // This is a little list holding our review cards data so we don't repeat code
  const reviews = [1, 2, 3]; 

  return (
    <div className="w-full bg-white py-16 px-4 text-center">
      
      {/* 1. THE MAIN HEADERS */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
        What Our Customers Say
      </h2>
      <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
        Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.
      </p>

      {/* 2. THE THREE CARDS LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12 px-2">
        {reviews.map((item, index) => (
          
          /* INDIVIDUAL WHITE CARD */
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 text-left flex flex-col justify-between">
            <div>
              {/* Profile Header */}
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                  alt="Emma Rodriguez" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Emma Rodriguez</h4>
                  <p className="text-xs text-gray-400">Barcelona, Spain</p>
                </div>
              </div>

              {/* 5 Shiny Stars */}
              <div className="flex space-x-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#0052FF] text-[#0052FF]" />
                ))}
              </div>

              {/* The Text Review */}
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides."
              </p>
            </div>
          </div>

        ))}
      </div>

    </div>
  );
};

export default Testimonials;