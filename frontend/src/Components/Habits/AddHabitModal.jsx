import { useEffect, useState } from "react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function AddHabitModal({ isOpen, onClose, onSave, intialData }) {
  const [task, setTask] = useState("");
  const [goal, setGoal] = useState("");
  const [frequency, setFrequency] = useState(daysOfWeek);

  useEffect(() => {
    function syncFormWithData() {
      if (!isOpen) return;

      if (intialData) {
        setTask(intialData.task || "");
        setGoal(intialData.goal || "");
        setFrequency(intialData.frequency || daysOfWeek);
      } else {
        setTask("");
        setGoal("");
        setFrequency(daysOfWeek);
      }
    }

    syncFormWithData();
  }, [isOpen, intialData]);

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...intialData,
      task,
      goal,
      frequency,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="neon-card w-96 relative border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
          {intialData ? "Edit Habit" : "New Habit"}
        </h2>

        <div className="space-y-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Habit name"
            className="neon-input placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Goal (e.g. 10 pages)"
            className="neon-input placeholder-gray-500 dark:placeholder-gray-400"
          />

          <div className="flex gap-2 flex-wrap mb-6">
            {daysOfWeek.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() =>
                  setFrequency((prev) =>
                    prev.includes(day)
                      ? prev.filter((d) => d !== day)
                      : [...prev, day]
                  )
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 border ${frequency.includes(day)
                  ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  : "bg-transparent text-gray-500 border-gray-600 hover:border-cyan-400 hover:text-cyan-400"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neon-button"
            >
              Save Habit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddHabitModal;
