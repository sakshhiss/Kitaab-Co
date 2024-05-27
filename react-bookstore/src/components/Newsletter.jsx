import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full py-16 text-gray-700 px-4 mt-20">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className=" md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Want to receive personalized updates?
          </h1>
          <p>
            Sign up to our newsletter and receive daily notifications about
            upcoming discounts and sales.
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full"> 
            <input
              className="py-3 px-2 flex w-full rounded-md text-black"
              type="email"
              placeholder="Enter Email"
            />
            <button className="bg-pink-500 text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
