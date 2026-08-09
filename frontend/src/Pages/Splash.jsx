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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-4">
      <div className="relative flex flex-col items-center justify-center space-y-6">
        <img
          src="https://res.cloudinary.com/dvsivw05r/image/upload/v1770193223/HABITIFY-app-logo_uku2dy.png"
          alt="Habitify"
          className="w-48 animate-pulse"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h1 className="text-4xl font-extrabold tracking-widest text-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          HABITIFY
        </h1>
        <div className="w-10 h-10 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Splash;