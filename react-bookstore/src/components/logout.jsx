import { useNavigate } from "react-router-dom";

const logout = (navigate) => {
  console.log("Logging out..."); // For debugging
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("loginTime");
  navigate("/");
};

export default logout;
