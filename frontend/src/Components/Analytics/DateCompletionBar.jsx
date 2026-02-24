import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DateCompletionBar({ analytics, dates, habitCount }) {
  const data = dates.map((d) => {
    const key = d.toISOString().split("T")[0];
    return {
      day: d.getDate(),
      completed: analytics.byDate[key]?.completed || 0,
    };
  });

  return (
    <div className="neon-card mt-8">
      <h2 className="neon-heading mb-6 text-xl">
        Daily Habit Completion
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
          <YAxis domain={[0, habitCount]} allowDecimals={false} stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
          <Tooltip
            cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }}
            contentStyle={{ backgroundColor: '#000', border: '1px solid #22d3ee', borderRadius: '8px', color: '#fff' }}
          />
          <Bar dataKey="completed" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DateCompletionBar;