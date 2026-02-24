import { updateAvatar } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://cdn.dribbble.com/userupload/23308831/file/original-f24f048df47bd5bd44e289ccffae7ec3.png",
  "https://www.shutterstock.com/image-vector/june-7-2024-batman-illustration-600nw-2481357159.jpg",
  "https://www.shutterstock.com/image-vector/captain-america-shield-icon-silhouette-600nw-2672870969.jpg",
  "https://fastdecals.com/shop/images/detailed/34/deadpool-decal-sticker-17FC-1.webp",
  "https://i.pinimg.com/originals/1c/66/e3/1c66e391b67ffb540a8da0aacdd0f259.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOPFtk_kpT6mfbpNOM3GMVmN1E_DcqByOVYQ&s",
  "https://subwaysurfers.com/media/gtbfdkc0/upgradeplay.jpg",
];

function AvatarPick() {
  const navigate = useNavigate();

  async function handlePick(src) {
    await updateAvatar(src);
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <h1 className="text-2xl font-bold mb-8 dark:text-white">
        Pick Your Avatar
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
        {avatars.map((src) => (
          <img
            key={src}
            src={src}
            onClick={() => handlePick(src)}
            className="w-24 h-24 rounded-full cursor-pointer border hover:scale-110 transition object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default AvatarPick;