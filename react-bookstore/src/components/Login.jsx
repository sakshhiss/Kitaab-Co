import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7295/api/Users/authenticate",
        {
          email,
          password,
        }
      );
      const { token, userId } = response.data; // Ensure response data keys match the backend response

      // Store token and userId in session storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("loginTime", Date.now().toString());
      console.log("Token:", token);
      console.log("UserId:", userId);

      // Redirect to the homepage
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-200">
          <h1 className="text-4xl font-semibold">Welcome Back</h1>
          <p className="text-lg font-medium text-gray-500 mt-4">
            Glad to see you back! Please enter your details.
          </p>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mt-7">
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-7 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label className="ml-2 font-medium text-base">
                    Remember me
                  </label>
                </div>
                <button className="font-medium text-base text-violet-500">
                  Forgot Password
                </button>
              </div>
              <div className="mt-7 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <div className="mt-7 flex justify-center items-center">
            <p className="font-medium text-base">Don't have an account?</p>
            <button className="text-violet-500 text-base font-medium ml-2">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
