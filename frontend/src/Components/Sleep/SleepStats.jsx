import { buildSleepStats } from "../../Utils/SleepUtils";

function SleepStats({ sleepData = {} }) {
  const stats = buildSleepStats(sleepData);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      <Stat label="Avg Sleep" value={`${stats.average} hrs`} color="text-cyan-400" />
      <Stat label="Best Day" value={`${stats.best} hrs`} color="text-green-400" />
      <Stat label="Worst Day" value={`${stats.worst} hrs`} color="text-red-400" />
      <Stat label="Consistency" value={`±${stats.consistency} hrs`} color="text-violet-400" />
      <Stat label="Goal Met" value={`${stats.goalMet} days`} color="text-amber-400" />
    </div>
  );
}

function Stat({ label, value, color }) {
  const hoverBgMap = {
    "text-cyan-400": "hover:bg-cyan-400",
    "text-green-400": "hover:bg-green-400",
    "text-red-400": "hover:bg-red-400",
    "text-violet-400": "hover:bg-violet-400",
    "text-amber-400": "hover:bg-amber-400",
  };

  const hoverBgClass = hoverBgMap[color] || "hover:bg-gray-400";

  return (
    <div className={`neon-card group p-4 text-center flex flex-col justify-center items-center hover:scale-105 transition duration-300 ${hoverBgClass}`}>
      <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white mb-1 transition-colors">{label}</p>
      <p className={`text-xl font-bold transition-colors ${color || 'dark:text-white'} group-hover:text-white`}>{value}</p>
    </div>
  );
}

export default SleepStats;
