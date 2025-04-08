"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ClassTimeOption {
  _id: string;
  day: string;
  start: string;
  end: string;
}

export default function ScheduleSelector({ userId }: { userId: string }) {
  const [classTimeOptions, setClassTimeOptions] = useState<ClassTimeOption[]>(
    []
  );
  const [selectedClassTimeIds, setSelectedClassTimeIds] = useState<string[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const fetchClassTimes = async () => {
      const res = await fetch("/api/classTime");
      const data = await res.json();
      setClassTimeOptions(data);
    };

    fetchClassTimes();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedClassTimeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    await fetch("/api/userClassTime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        classTimes: selectedClassTimeIds,
      }),
    });
  };

  const goBackToHome = () => {
    router.push("/");
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      {" "}
      <h2>Select Your Class Times</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {classTimeOptions.map(({ _id, day, start, end }) => (
          <label key={_id} style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              value={_id}
              checked={selectedClassTimeIds.includes(_id)}
              onChange={() => handleCheckboxChange(_id)}
            />
            {`${day} - ${start} to ${end}`}
          </label>
        ))}
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit">Save Schedule</button>
      </form>
      <button
        onClick={goBackToHome}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
      >
        Back to Home
      </button>
    </div>
  );
}
