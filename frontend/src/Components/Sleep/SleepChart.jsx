import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateTotalSleep } from "../../Utils/SleepUtils";

function SleepChart({ days = [], sleepData = {} }) {
  const formatDate = (d) => d.toISOString().split("T")[0];

  const data = days.map((d) => {
    const key = formatDate(d);
    const record = sleepData[key] || {};

    return {
      day: d.getDate(),
      sleep: calculateTotalSleep(
        record.hours ?? 0,
        record.minutes ?? 0
      ),
    };
  });

  return (
    <div className="neon-card mt-6">
      <h2 className="neon-heading mb-4 text-xl">
        Sleep Graph
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis domain={[0, 15]} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ backgroundColor: '#000', border: '1px solid #22d3ee', borderRadius: '8px' }}
            itemStyle={{ color: '#22d3ee' }}
          />
          <Line
            type="monotone"
            dataKey="sleep"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 4, fill: '#22d3ee' }}
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SleepChart;
