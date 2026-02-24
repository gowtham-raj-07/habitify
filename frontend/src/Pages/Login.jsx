import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data.token, res.data.user);

      navigate("/splash");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b0b0b] border border-cyan-400/30
                   p-8 rounded-2xl w-80
                   shadow-[0_0_40px_rgba(34,211,238,0.25)]
                   hover:shadow-[0_0_60px_rgba(34,211,238,0.45)]
                   transition duration-300"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          Login
        </h2>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg
                     bg-transparent border border-cyan-400/40
                     text-white placeholder-gray-400
                     focus:outline-none focus:border-cyan-300
                     focus:shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg
                     bg-transparent border border-cyan-400/40
                     text-white placeholder-gray-400
                     focus:outline-none focus:border-cyan-300
                     focus:shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        />

        <button
          className="w-full py-2 rounded-full
                     bg-cyan-400 text-black font-semibold
                     hover:bg-cyan-300
                     hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]
                     transition"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;