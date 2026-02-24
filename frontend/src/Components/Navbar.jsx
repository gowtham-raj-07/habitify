import { NavLink, useNavigate } from "react-router-dom";
import { Home, BedDouble, CheckSquare, User, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function toggle() {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  function out() {
    logout();
    navigate("/login");
  }

  const link = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-300 ${
      isActive
        ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)]"
        : "text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10"
    }`;

  const logo =
    document.documentElement.classList.contains("dark")
      ? "https://res.cloudinary.com/dvsivw05r/image/upload/v1766940178/Screenshot_2025-12-28_220358_kzvnix.png"
      : "https://res.cloudinary.com/dvsivw05r/image/upload/v1770193694/logo-horizontal-white-bg_nzd9zx.png";

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-cyan-400/20 dark:border-cyan-400/30 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <img src={logo} className="h-10 object-contain drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]" />

        <div className="flex items-center gap-2">
          <NavLink to="/" className={link}>
            <Home size={18} /> Home
          </NavLink>

          <NavLink to="/sleep" className={link}>
            <BedDouble size={18} /> Sleep
          </NavLink>

          <NavLink to="/todo" className={link}>
            <CheckSquare size={18} /> Notes
          </NavLink>

          <NavLink to="/user" className={link}>
            <User size={18} /> User
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-cyan-500 hover:bg-cyan-400/10 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated && (
            <button
              onClick={out}
              className="px-4 py-1.5 rounded-full border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}