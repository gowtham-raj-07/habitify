import { useState } from "react";
import { updateAvatar } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://cdn.dribbble.com/userupload/23308831/file/original-f24f048df47bd5bd44e289ccffae7ec3.png",
  "https://www.shutterstock.com/image-vector/june-7-2024-batman-illustration-600nw-2481357159.jpg",
  "https://www.shutterstock.com/image-vector/captain-america-shield-icon-silhouette-600nw-2672870969.jpg",
  "https://i.pinimg.com/originals/1c/66/e3/1c66e391b67ffb540a8da0aacdd0f259.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOPFtk_kpT6mfbpNOM3GMVmN1E_DcqByOVYQ&s",
  "https://subwaysurfers.com/media/gtbfdkc0/upgradeplay.jpg",
];

function AvatarPick() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePick(src) {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      await updateAvatar(src);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black p-6">
      <h1 className="text-3xl font-bold mb-2 dark:text-white text-cyan-400">
        Pick Your Avatar
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">
        Select a profile picture to complete your registration
      </p>

      {error && (
        <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg text-sm mb-6 max-w-sm text-center">
          {error}
        </p>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center space-y-3 mb-6">
          <div className="w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-sm text-cyan-400 font-medium">Saving avatar...</p>
        </div>
      )}

      <div className={`grid grid-cols-3 md:grid-cols-4 gap-6 transition ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        {avatars.map((src) => (
          <img
            key={src}
            src={src}
            onClick={() => handlePick(src)}
            className="w-24 h-24 rounded-full cursor-pointer border border-cyan-400/20 hover:border-cyan-400 hover:scale-110 shadow-lg transition object-cover bg-neutral-900"
          />
        ))}
      </div>
    </div>
  );
}

export default AvatarPick;
