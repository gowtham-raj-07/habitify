import { useEffect, useState } from "react";
import Loader from "../Components/Ui/Loader";
import SleepTable from "../Components/Sleep/SleepTable";
import SleepChart from "../Components/Sleep/SleepChart";
import SleepStats from "../Components/Sleep/SleepStats";
import { fetchSleepByMonth, saveSleepEntry } from "../Api/SleepApi";

function Sleep() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [sleepData, setSleepData] = useState({});
  const [loading, setLoading] = useState(true);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  useEffect(() => {
    function loadSleep() {
      return fetchSleepByMonth(monthKey)
        .then((res) => {
          setSleepData(res.data.records || {});
        })
        .finally(() => {
          setLoading(false);
        });
    }

    loadSleep();
  }, [monthKey]);

  async function handleSaveSleep(dateKey, hours, minutes) {
    const res = await saveSleepEntry(monthKey, {
      day: dateKey,
      hours,
      minutes,
    });

    setSleepData(res.data.records || {});
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  if (loading) return <Loader />;

  return (
    <div className="p-6 w-full space-y-8 animate-fadeIn">

      {/* MONTH NAVIGATION */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="neon-button-outline px-4 py-2 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="neon-heading">{monthLabel}</h1>
        <button onClick={nextMonth} className="neon-button-outline px-4 py-2 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <SleepTable
        days={days}
        sleepData={sleepData}
        setSleepData={setSleepData}
        onSave={handleSaveSleep}
      />

      <SleepChart days={days} sleepData={sleepData} />
      <SleepStats sleepData={sleepData} />
    </div>
  );
}

export default Sleep;
