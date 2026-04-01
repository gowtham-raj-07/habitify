import { useEffect, useState } from "react";
import Loader from "../Components/Ui/Loader";
import { fetchProfile } from "../Api/UserApi";
import { fetchHabits } from "../Api/HabitApi";
import { fetchNotes } from "../Api/NoteApi";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, CheckSquare, BedDouble, FileText } from "lucide-react";

function User() {
  const [data, setData] = useState(null);
  const [computedHabits, setComputedHabits] = useState({ created: 0, completed: 0, missed: 0 });
  const [computedNotes, setComputedNotes] = useState({ count: 0, totalWeight: 0, avgWeight: 0 });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchProfile(), fetchHabits(), fetchNotes()]).then(([profileRes, habitsRes, notesRes]) => {
      setData(profileRes.data);

      const habitsList = habitsRes.data || [];
      const notesList = notesRes.data || [];

      // Compute Habits All-time Stats
      let totalCompleted = 0;
      let totalMissed = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dayName = (d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

      habitsList.forEach((h) => {
        const created = new Date(h.createdAt);
        created.setHours(0, 0, 0, 0);

        for (let d = new Date(created); d <= today; d.setDate(d.getDate() + 1)) {
          const copy = new Date(d);
          copy.setHours(0, 0, 0, 0);

          if (h.frequency?.includes(dayName(copy))) {
            const key = copy.toISOString().split("T")[0];
            if (h.records?.[key] === true) {
              totalCompleted++;
            } else {
              totalMissed++;
            }
          }
        }
      });

      setComputedHabits({
        created: habitsList.length,
        completed: totalCompleted,
        missed: totalMissed
      });

      // Compute Notes Weight Stats
      let totalWeight = 0;
      notesList.forEach(n => {
        totalWeight += (n.weight || 0);
      });
      const avgWeight = notesList.length > 0 ? Math.round(totalWeight / notesList.length) : 0;

      setComputedNotes({
        count: notesList.length,
        totalWeight,
        avgWeight
      });

      setLoading(false);
    });
  }, []);

  if (loading || !data) return <Loader />;

  const { user, sleep } = data;

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
              <span className="font-bold text-cyan-600 dark:text-cyan-400">{computedHabits.created}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Days Completed</span>
              <span className="font-bold text-green-400">{computedHabits.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Days Missed</span>
              <span className="font-bold text-red-400">{computedHabits.missed}</span>
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
              <span className="font-bold dark:text-gray-200">{computedNotes.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Weight</span>
              <span className="font-bold text-amber-500">{computedNotes.totalWeight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Avg Weight</span>
              <span className="font-bold text-amber-300">{computedNotes.avgWeight}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default User;