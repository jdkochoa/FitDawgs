import ScheduleSelector from "@/components/ScheduleSelector";
// UserId is hard coded for now. It can change once auth and sign in/login are done.
// This references the test user I made.
export default function SchedulePage() {
  return (
    <div>
      <h1>My Schedule</h1>
      <ScheduleSelector userId="67f4563e32a1efe36468fe5a" />
    </div>
  );
}
