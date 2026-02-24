import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#42f554", "#f54242"];

function HabitsPieCharts({ analytics }) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <span className="w-2 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        Habits Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(analytics.byHabit).map(
          ([habitName, data]) => {
            const pieData = [
              { name: "Completed", value: data.completed },
              { name: "Missed", value: data.missed },
            ];

            return (
              <div
                key={habitName}
                className="neon-card flex flex-col items-center focus:outline-none outline-none"
                tabIndex="-1"
              >
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white border-b-2 border-cyan-400/20 pb-1">
                  {habitName}
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      nameKey="name"
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={0}
                      label
                      stroke="none"
                      style={{ outline: 'none' }}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                          strokeWidth={0}
                          style={{ outline: 'none' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #22d3ee', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default HabitsPieCharts;
