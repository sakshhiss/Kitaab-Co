import { useNavigate } from "react-router-dom";

const logout = (navigate) => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("loginTime");
  navigate("/");
};

export default logout;
