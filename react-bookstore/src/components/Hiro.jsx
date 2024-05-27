import React from "react";
import { ReactTyped, Typed } from "react-typed";
import "./Hiro.css";

const Hiro = () => {
  return (
    <div class="all" className="">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-pink-500 font-bold p-2 md:text-xl sm:text-xl text-md">
          Discover your next great read.
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Leading with Reading.
        </h1>
        <div className="flex justify-center items-center ">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Dive into a world of
          </p>
          <p>
          <ReactTyped
            className="text-pink-500 md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["suspense", "romance", "thriller", "books."]}
            typeSpeed={120}
            backSpeed={100}
            loop
          />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hiro;
