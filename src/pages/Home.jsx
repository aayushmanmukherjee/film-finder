import React from "react";
import hero from "../assets/shawshank-redemption-banner.jpg";
import Navigation from "../components/Navigation";
import Explainer from "../components/Explainer";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      {/* Navigation section */}
      <div className="relative h-[600px]">
        {/* <div className='absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-200/10 to-gray-950  z-10 h-full w-full'></div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-200/10 to-gray-950 z-10 h-full w-full"></div>

        <img
          src={hero}
          alt="banner"
          className="h-full w-full bg-center bg-cover absolute inset-0 z-0"
        />
        <div className="absolute top-2 z-20 w-full md:py-2">
          <Navigation />
        </div>
      </div>

      {/* Explainer section */}
      <div className="bg-[#2c3440] bg-gradient-to-b from-gray-950 to-gray-950 w-full h-auto">
        <h2 className="text-gray-400 font-semibold text-3xl text-center pt-4">
          How FilmFinder works
        </h2>
        <Explainer />
      </div>
      <div> <Footer/></div>
     
    </div>
  );
};

export default Home;
