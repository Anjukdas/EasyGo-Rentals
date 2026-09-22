import HeroSearch from "../components/HeroSearch";
import HeroTitle from "../components/HeroTitle";

const Home = () => {
  const featuredCars = [
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
  ];

  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        className="
          relative
          min-h-screen
          bg-cover
          bg-center
          bg-no-repeat
          flex
          items-start
          justify-center
          pt-28
          sm:pt-28
          lg:pt-32
          pb-12
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
        }}
      >

        {/* Background Overlay */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-b
          from-gray-700/60
          via-gray-500/20
          to-transparent
        " />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <HeroTitle />
          <HeroSearch />
        </div>

      </section>


      {/* FEATURED CARS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-100">

        <h2 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-center
          mb-8
          sm:mb-10
        ">
          Featured Cars
        </h2>

        <div className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          lg:gap-8
        ">

          {featuredCars.map((car, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow-lg
                overflow-hidden
                transition
                duration-300
                hover:-translate-y-1
              "
            >

              <img
                src={car.image}
                alt={car.name}
                loading="lazy"
                className="
                  h-48
                  sm:h-52
                  lg:h-56
                  w-full
                  object-cover
                "
              />

              <div className="p-5">

                <h3 className="text-xl sm:text-2xl font-semibold">
                  {car.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {car.price}
                </p>

                <button className="
                  mt-4
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-blue-700
                  transition
                ">
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">

        <h2 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-center
          mb-8
          sm:mb-10
        ">
          Why Choose Us?
        </h2>

        <div className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          text-center
        ">

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


      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center px-4 py-6">

        <h3 className="text-xl font-semibold">
          Car Rental
        </h3>

        <p className="mt-2 text-sm sm:text-base">
          © 2026 All Rights Reserved
        </p>

      </footer>

    </div>
  );
};

export default Home;