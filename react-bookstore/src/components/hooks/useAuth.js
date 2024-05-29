import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const useAuth = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useContext(AuthContext);

  useEffect(() => {
    const checkSession = () => {
      const token = sessionStorage.getItem("token");
      const loginTime = sessionStorage.getItem("loginTime");

      if (!token || !loginTime) {
        navigate("/");
        return;
      }

      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      if (elapsedTime > 3600000) {  // 1 hour in milliseconds
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("loginTime");
        navigate("/", {
          state: { message: "Session expired. Please log in again." },
        });
      } else {
        checkAuthStatus();
      }
    };

    // Initial session check
    checkSession();

    // Set interval to check session every minute
    const interval = setInterval(checkSession, 60000); 

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [navigate, checkAuthStatus]);
};

export default useAuth;
