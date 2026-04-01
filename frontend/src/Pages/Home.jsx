import { useEffect, useMemo, useState } from "react";
import Loader from "../Components/Ui/Loader";

import AddHabitModal from "../Components/Habits/AddHabitModal";
import EmptyState from "../Components/Habits/EmptyState";
import HabitsTable from "../Components/Habits/HabitsTable";
import HabitAnalytics from "../Components/Analytics/HabitAnalytics";

import buildAnalyticsData from "../Utils/BuildAnalytics";

import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitRecord,
} from "../Api/HabitApi";

function Home() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    function loadHabits() {
      return fetchHabits()
        .then((res) => {
          setHabits(res.data || []);
        })
        .finally(() => setLoading(false));
    }

    loadHabits();
  }, []);

  const dates = useMemo(() => {
    if (habits.length === 0) return [];

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const list = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);
      list.push(copy);
    }

    return list;
  }, [year, month, habits.length]);

  const analytics = useMemo(() => {
    if (!habits.length || !dates.length) return null;
    return buildAnalyticsData(habits, dates);
  }, [habits, dates]);

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  async function handleToggle(habit, dateKey) {
    const current = habit.records?.[dateKey] === true;

    const res = await toggleHabitRecord(
      habit._id,
      dateKey,
      !current
    );

    setHabits((prev) =>
      prev.map((h) =>
        h._id === habit._id ? res.data : h
      )
    );
  }

  async function handleSaveHabit(data) {
    let res;

    if (data._id) {
      res = await updateHabit(data._id, data);
      setHabits((prev) =>
        prev.map((h) =>
          h._id === data._id ? res.data : h
        )
      );
    } else {
      res = await createHabit(data);
      setHabits((prev) => [res.data, ...prev]);
    }

    setIsModalOpen(false);
    setEditingHabit(null);
  }

  async function handleDeleteHabit(id) {
    const ok = window.confirm("Delete this habit?");
    if (!ok) return;

    await deleteHabit(id);
    setHabits((p) => p.filter((h) => h._id !== id));
  }

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditingHabit(null);
            setIsModalOpen(true);
          }}
          className="neon-button"
        >
          + Add Habit
        </button>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          onAdd={() => setIsModalOpen(true)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                if (month === 0) {
                  setMonth(11);
                  setYear((y) => y - 1);
                } else {
                  setMonth((m) => m - 1);
                }
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h1 className="text-2xl font-bold">
              {monthLabel}
            </h1>

            <button
              onClick={() => {
                if (month === 11) {
                  setMonth(0);
                  setYear((y) => y + 1);
                } else {
                  setMonth((m) => m + 1);
                }
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <HabitsTable
            habits={habits}
            dates={dates}
            onToggle={handleToggle}
            onEdit={(habit) => {
              setEditingHabit(habit);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteHabit}
          />

          {analytics && (
            <HabitAnalytics
              analytics={analytics}
              habitCount={habits.length}
              dates={dates}
            />
          )}
        </>
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        intialData={editingHabit}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHabit(null);
        }}
        onSave={handleSaveHabit}
      />
    </div>
  );
}

export default Home;
