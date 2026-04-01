import { useEffect, useRef } from "react";

function HabitsTable({ habits, dates, onToggle, onEdit, onDelete }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const keyOf = (d) => d.toISOString().split("T")[0];

  const dayName = (d) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

  const todayRef = useRef(null);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [dates]);

  return (
    <div className="neon-card overflow-x-auto">
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-cyan-400">
            <th className="p-3 text-left">Habit</th>
            <th className="p-3 text-left">Goal</th>

            {dates.map((d) => {
              const isToday = keyOf(d) === keyOf(today);
              return (
                <th
                  key={keyOf(d)}
                  className="p-2 min-w-[50px]"
                  ref={isToday ? todayRef : null}
                >
                  <div className="text-sm font-semibold">{d.getDate()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{dayName(d)}</div>
                </th>
              );
            })}

            <th className="p-3">Current</th>
            <th className="p-3">Longest</th>
            <th className="p-3">Edit</th>
            <th className="p-3">Delete</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {habits.map((h) => {
            let streak = 0;
            let max = 0;

            dates.forEach((d) => {
              const created = new Date(h.createdAt);
              created.setHours(0, 0, 0, 0);

              const current = new Date(d);
              current.setHours(0, 0, 0, 0);

              const allowed =
                current >= created &&
                current <= today &&
                h.frequency?.includes(dayName(current));

              if (!allowed) return;

              const k = keyOf(current);

              if (h.records?.[k] === true) {
                streak++;
                max = Math.max(max, streak);
              } else {
                streak = 0;
              }
            });

            return (
              <tr
                key={h._id}
                className="hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10 transition duration-200"
              >
                <td className="p-3 text-left font-medium text-gray-900 dark:text-white">{h.task}</td>

                <td className="p-3 text-left text-gray-600 dark:text-gray-400">
                  {h.goal || "-"}
                </td>

                {dates.map((d) => {
                  const created = new Date(h.createdAt);
                  created.setHours(0, 0, 0, 0);

                  const current = new Date(d);
                  current.setHours(0, 0, 0, 0);

                  const allowed =
                    current >= created &&
                    current <= today &&
                    h.frequency?.includes(dayName(current));

                  const k = keyOf(current);

                  if (!allowed) {
                    return (
                      <td
                        key={k}
                        className="p-2"
                      >
                        <div className="mx-auto w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800/50" />
                      </td>
                    );
                  }

                  const checked = h.records?.[k] === true;

                  return (
                    <td key={k} className="p-2">
                      <button
                        onClick={() => onToggle(h, k)}
                        className={`mx-auto flex items-center justify-center w-6 h-6 rounded-md transition duration-300
                        ${checked
                            ? "bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                            : "bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-400"
                          }`}
                      >
                        {checked && (
                          <span className="text-xs font-bold">✓</span>
                        )}
                      </button>
                    </td>
                  );
                })}

                <td className="p-3 font-semibold text-cyan-600 dark:text-cyan-400">{streak}</td>
                <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">{max}</td>

                <td className="p-3">
                  <button
                    onClick={() => onEdit(h)}
                    className="group relative px-4 py-1.5 rounded-lg bg-transparent border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-medium overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-cyan-500/10"
                  >
                    Edit
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => onDelete(h._id)}
                    className="group relative px-4 py-1.5 rounded-lg bg-transparent border border-red-500/30 text-red-600 dark:text-red-400 font-medium overflow-hidden transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HabitsTable;