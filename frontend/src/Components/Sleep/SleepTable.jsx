import { Fragment } from "react";

function SleepTable({ days, sleepData = {}, setSleepData, onSave, createdAt }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const created = new Date(createdAt || today);
  created.setHours(0, 0, 0, 0);

  const formatDate = (d) => d.toISOString().split("T")[0];

  const isDisabled = (d) => {
    const current = new Date(d);
    current.setHours(0, 0, 0, 0);
    return current > today;
  };

  const handleChange = (date, field, value) => {
    const key = formatDate(date);
    const num = Math.max(0, Number(value));

    setSleepData((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          [field]: field === "hours" ? Math.min(num, 15) : Math.min(num, 59),
        },
      };

      onSave(key, updated[key].hours || 0, updated[key].minutes || 0);
      return updated;
    });
  };

  return (
    <div className="neon-card overflow-x-auto">
      <table className="min-w-full border-collapse text-center border border-cyan-500/20">
        <thead>
          <tr>
            <th rowSpan="2" className="p-2 border-b border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-cyan-400">Sleep</th>
            {days.map((d) => (
              <th key={d.toISOString()} colSpan="2" className="p-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                {d.getDate()}
              </th>
            ))}
          </tr>
          <tr>
            {days.map((d) => (
              <Fragment key={d.toISOString()}>
                <th className="p-1 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-500">hrs</th>
                <th className="p-1 border-b border-r border-gray-200 dark:border-gray-700 text-xs text-gray-500">min</th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2 border-r border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-cyan-400">Duration</td>

            {days.map((d) => {
              const key = formatDate(d);
              const disabled = isDisabled(d);

              return (
                <Fragment key={key}>
                  <td className="p-1">
                    <input
                      type="number"
                      disabled={disabled}
                      value={sleepData[key]?.hours || ""}
                      onChange={(e) => handleChange(d, "hours", e.target.value)}
                      className={`w-12 text-center rounded border transition-all duration-300
                          ${disabled
                          ? "bg-gray-300 dark:bg-gray-700 border-gray-400 text-gray-500 cursor-not-allowed"
                          : "bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-cyan-400 dark:shadow-[0_0_8px_rgba(34,211,238,0.5)] focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.5)] outline-none"
                        }`}
                    />
                  </td>

                  <td className="p-1 border-r border-gray-200 dark:border-gray-700">
                    <input
                      type="number"
                      disabled={disabled}
                      value={sleepData[key]?.minutes || ""}
                      onChange={(e) => handleChange(d, "minutes", e.target.value)}
                      className={`w-12 text-center rounded border transition-all duration-300
                        ${disabled
                          ? "bg-gray-300 dark:bg-gray-700 border-gray-400 text-gray-500 cursor-not-allowed"
                          : "bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-cyan-400 dark:shadow-[0_0_8px_rgba(34,211,238,0.5)] focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.5)] outline-none"
                        }`}
                    />
                  </td>
                </Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SleepTable;