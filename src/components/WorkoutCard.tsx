
type WorkoutCardProps = {
    title: string;
    time: string;
    exercises: string[];
    goals: string[];
};

export default function WorkoutCard({ title, time, exercises, goals }: WorkoutCardProps) {
    return (
        <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
            <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
                <h1 className="text-2xl font-semibold mb-2">{title}</h1>
                <p className="mb-6">{time}</p>

            </div>
        </div>
    )
}