import React from 'react';

const Home = () => {
  return (
    <div className="w-full bg-white px-5 lg:px-16 py-10">
  
      <div className="relative w-full rounded-3xl overflow-hidden">
        {/* Background Image */}
        <img
          src="/Home-2.png"
          alt="Hero Food Banner"
          className="w-full h-[420px] "
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-20 text-white">
  <h1 className="text-5xl font-bold leading-tight">
    Order Your <br /> Favourite Food <br /> Here
  </h1>

  <p className="mt-4 max-w-xl text-gray-100 text-lg">
    Choose from a diverse and carefully curated menu featuring a variety of dishes,
    each crafted with love and the finest ingredients to delight your taste buds.
  </p>

  {/* View All Button */}
  <button
    className="mt-8 w-fit bg-white text-gray-500 px-6 py-2 rounded-full pointer
               text-sm font-medium shadow-md 
              "
  >
    View All
  </button>
</div>

      </div>

    </div>
  );
};

export default Home;
