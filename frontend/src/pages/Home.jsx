import HeroSearch from "../components/HeroSearch";
import HeroTitle from "../components/HeroTitle";


const Home = () => {
  return (
    <div >
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex-col items-center justify-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
        }}
      ><div >
        <HeroTitle/>
        <HeroSearch />

      </div>
        
      </section>

      {/* Featured Cars */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Cars
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "BMW X5",
              price: "25 OMR/day",
              image:
                "https://images.unsplash.com/photo-1555215695-3004980ad54e",
            },
            {
              name: "Mercedes C-Class",
              price: "30 OMR/day",
              image:
                "https://images.unsplash.com/photo-1502877338535-766e1452684a",
            },
            {
              name: "Audi A6",
              price: "28 OMR/day",
              image:
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
            },
          ].map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-semibold">
                  {car.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {car.price}
                </p>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Affordable Prices
            </h3>
            <p>Best rental rates in the market.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Premium Cars
            </h3>
            <p>Wide range of luxury vehicles.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Easy Booking
            </h3>
            <p>Book your car in minutes.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              24/7 Support
            </h3>
            <p>Always available for assistance.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <h3 className="text-xl font-semibold">Car Rental</h3>
        <p className="mt-2">
          © 2026 All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;