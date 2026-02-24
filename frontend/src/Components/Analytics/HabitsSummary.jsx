function HabitsSummary({ analytics }) {
  const { completed, missed } = analytics.overall;
  const total = completed + missed;

  const overallPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="neon-card mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="w-2 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        Habit Summary
      </h2>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Overall Completion</span>
          <span className="text-3xl font-bold neon-text">{overallPercentage}%</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
          <div
            className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-1000 ease-out"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        {Object.entries(analytics.byHabit).map(([habitName, data], index) => {
          const habitTotal = data.completed + data.missed;
          const percent =
            habitTotal === 0 ? 0 : Math.round((data.completed / habitTotal) * 100);

          const PALETTE = ['#22d3ee', '#ec4899', '#ef4444', '#eab308', '#a855f7', '#22c55e'];
          const barColor = PALETTE[index % PALETTE.length];
          const shadowColor = barColor;

          return (
            <div key={habitName}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-200 font-medium">{habitName}</span>
                <span className="font-bold" style={{ color: barColor }}>{percent}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: barColor,
                    boxShadow: `0 0 8px ${shadowColor}`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitsSummary;
