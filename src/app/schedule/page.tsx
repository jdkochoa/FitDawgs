import ScheduleSelector from "@/components/ScheduleSelector";

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-4xl text-center">
        <h1 className="text-3xl font-semibold mb-6 text-red-700">My UGA Schedule</h1>
        <p className="mb-6 text-lg">
          Select the days and times of your classes to help us create your personalized schedule.
        </p>
        <ScheduleSelector userId="67f4563e32a1efe36468fe5a" />
      </div>
    </div>
  );
}