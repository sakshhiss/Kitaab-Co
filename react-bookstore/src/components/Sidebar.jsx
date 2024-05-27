import React from "react";
import { FaBook } from "react-icons/fa";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="bg-white h-full min-h-screen lg:w-[17%] md:lg:w-[17%] sm:w-[30%] flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-pink-500 w-full">Kitaab & Co.</h1>
        <hr className="separator" />
      </div>
      <nav className="flex-1">
        <ul>
          <li className="px-6 py-2 text-[#313035] hover:bg-gray-200">
            <a href="#" className="flex items-center font-semibold">
              <FaBook className="mr-2 text-pink-500" />
              Posts
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
