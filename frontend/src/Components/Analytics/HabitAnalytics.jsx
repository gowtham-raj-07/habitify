import DateCompletionBar from "./DateCompletionBar";
import HabitsPieCharts from "./HabitsPieCharts";
import HabitsSummary from "./HabitsSummary";

export default function HabitAnalytics({ analytics, habitCount, dates }) {
  return (
    <div>
      <DateCompletionBar
        analytics={analytics}
        habitCount={habitCount}
        dates={dates}
      />
      <HabitsPieCharts analytics={analytics} />
      <HabitsSummary analytics={analytics} />
    </div>
  );
}