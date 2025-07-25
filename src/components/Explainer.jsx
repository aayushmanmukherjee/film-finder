import React from "react";
import Explainer1 from "../assets/scarface-explainer.webp";
import Explainer2 from "../assets/taxi-driver-explainer.webp";

const Explainer = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-5 px-40 py-10">
        <div className="w-[50%]">
        <h3 className="text-white font-semibold text-2xl">Browse</h3>
        <p className="text-gray-400">
          MovieFinder is a simple and powerful tool to help you explore and track
          movies you love. Just start by typing the name of a movie or actor or director into the
          search bar — you'll instantly see detailed information about the
          movie.
        </p>
        </div>
        <div className="relative w-[50%]">
          <img
            src={Explainer1}
            alt="scarface poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-200/10 to-gray-950 z-10"></div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 px-40 py-10">
        <div className="relative w-[50%]">
          <img
            src={Explainer2}
            alt="scarface poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-200/10 to-gray-950 z-10"></div>
        </div>
        <div className="w-[50%]">
        <h3 className="text-white font-semibold text-2xl">Save</h3>
        <p className="text-gray-400">
          If it's a movie you've enjoyed or plan to watch later, you can
          easily add it to your personal list with a single click. Your list
          lets you keep track of all your favorite movies or those you're
          planning to check out soon, so you can revisit them anytime.
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default Explainer;
