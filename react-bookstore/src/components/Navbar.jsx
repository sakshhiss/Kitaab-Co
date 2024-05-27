import React, { useState, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logout from "./logout";
import { AuthContext } from "./AuthContext";
import useAuth from "./hooks/useAuth";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn, isAdmin, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  // Use the useAuth hook to handle authentication and session expiration
  useAuth();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout(navigate);
    checkAuthStatus(); // Update auth status after logout
  };
  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
      <h1 className="text-3xl font-bold text-pink-500 w-full">
        <Link to="/home">Kitaab & Co.</Link>
      </h1>
      <ul className="md:flex hidden text-xl">
        <li className="p-4">
          <Link to="/home">Home</Link>
        </li>
        {!isLoggedIn && (
          <li className="p-4">
            <Link to="/">Signin</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            {isAdmin && (
              <li className="p-4">
                <Link to="/adminpanel">Admin </Link>
              </li>
            )}
            <li className="p-4 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>
      <div onClick={handleNav} className="md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
        }
      >
        <h1 className="text-3xl font-bold text-pink-500 w-full m-4">
          Kitaab & Co.
        </h1>
        <ul className="pt-24">
          <li className="p-4 border-b border-gray-600">
            <Link to="/home">Home</Link>
          </li>
          {!isLoggedIn && (
            <li className="p-4 border-b border-gray-600">
              <Link to="/">Signin</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              {isAdmin && (
                <li className="p-4 border-b border-gray-600">
                  <Link to="/adminpanel">Admin </Link>
                </li>
              )}
              <li
                className="p-4 border-b border-gray-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
