import { useEffect, useState } from "react";
import { fetchProfile } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, CheckSquare, BedDouble, FileText } from "lucide-react";

function User() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  const { user, habits, sleep, notes } = data;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fadeIn">

      {/* Profile Section */}
      <div className="neon-card flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={user.avatar}
            alt="avatar"
            className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-black shadow-2xl"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center justify-center md:justify-start gap-2">
            {user.name}
            {/* <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">PRO</span> */}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>

          <button
            onClick={() => navigate("/avatar")}
            className="neon-button text-sm px-8"
          >
            Change Avatar
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Habits Stats */}
        <div className="neon-card hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400">
              <CheckSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Habits</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Created</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">{habits.created || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Days Completed</span>
              <span className="font-bold text-green-400">{habits.completed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Days Missed</span>
              <span className="font-bold text-red-400">{habits.missed || 0}</span>
            </div>
          </div>
        </div>

        {/* Sleep Stats */}
        <div className="neon-card hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400">
              <BedDouble size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sleep</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Average</span>
              <span className="font-bold dark:text-gray-200">{sleep.average} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Consistency</span>
              <span className="font-bold text-violet-400">±{sleep.consistency || 0} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Goal Met</span>
              <span className="font-bold text-amber-400">{sleep.goalMet} days</span>
            </div>
          </div>
        </div>

        {/* Notes Stats */}
        <div className="neon-card hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notes</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Created</span>
              <span className="font-bold dark:text-gray-200">{notes.count}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default User;