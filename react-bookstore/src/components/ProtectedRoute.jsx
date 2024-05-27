import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  useAuth(); // Check for session expiration

  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
