import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const justRegistered = localStorage.getItem("justRegistered");

      if (justRegistered) {
        localStorage.removeItem("justRegistered");
        navigate("/avatar");
      } else {
        navigate("/");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <img
        src="https://res.cloudinary.com/dvsivw05r/image/upload/v1770193223/HABITIFY-app-logo_uku2dy.png"
        alt="Habitify"
        className="w-48 animate-pulse"
      />
    </div>
  );
}

export default Splash;