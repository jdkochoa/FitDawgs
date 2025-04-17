"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/app/signup/context/SignUpContext";

interface ClassTimeOption {
  _id: string;
  day: string;
  start: string;
  end: string;
}

export default function ScheduleSelector() {
  const [classTimeOptions, setClassTimeOptions] = useState<ClassTimeOption[]>(
    []
  );
  const [selectedClassTimeIds, setSelectedClassTimeIds] = useState<string[]>(
    []
  );
  const router = useRouter();

  // Retreive User data from the context
  const { data } = useSignUp();

  useEffect(() => {
    const fetchClassTimes = async () => {
      const res = await fetch("/api/classTime");
      const data = await res.json();

      const sortedData = data.sort((a: ClassTimeOption, b: ClassTimeOption) => {
        const daysOrder = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ];
        const dayComparison =
          daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
        if (dayComparison !== 0) return dayComparison;

        // Currently I have start and end times as strings, so I am convert them to Date for listing
        const parseTime = (time: string) => {
          const [hour, minutePart] = time.split(":");
          const [minute, period] = minutePart.split(" ");
          let hour24 = parseInt(hour, 10);
          if (period.toLowerCase() === "pm" && hour24 !== 12) hour24 += 12;
          if (period.toLowerCase() === "am" && hour24 === 12) hour24 = 0;
          return hour24 * 60 + parseInt(minute, 10); // Convert to total minutes
        };

        return parseTime(a.start) - parseTime(b.start);
      });

      setClassTimeOptions(sortedData);
    };

    fetchClassTimes();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedClassTimeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      // POST request to create a new user
      const payload = {
        username: data.username,
        email: data.email,
        password: data.hashedPassword,
      };

      const userResponse = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (userResponse.ok) {
        console.log("User created successfully.");
      } else {
        console.error("Error creating user:", userResponse.statusText);
        return;
      }

      // Get the userID from the newly created user to POST to userclasstimes
      const userResponseData = await userResponse.json();
      const userId = userResponseData.userID;

      const scheduleResponse = await fetch("/api/userClassTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          classTimes: selectedClassTimeIds,
        }),
      });

      if (scheduleResponse.ok) {
        console.log("Schedule submitted successfully.");
        router.push("/profile");
      } else {
        console.error(
          "Error submitting schedule:",
          scheduleResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };

  const goBackToHome = () => {
    router.push("/");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="text-left"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <div key={day}>
                <h3 className="text-xl font-semibold text-red-700 mb-4">
                  {day}
                </h3>
                {classTimeOptions
                  .filter((classTime) => classTime.day === day)
                  .map(({ _id, start, end }) => (
                    <label
                      key={_id}
                      className="block mb-2 cursor-pointer hover:bg-red-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        value={_id}
                        checked={selectedClassTimeIds.includes(_id)}
                        onChange={() => handleCheckboxChange(_id)}
                        className="mr-2"
                      />
                      {`${start} to ${end}`}
                    </label>
                  ))}
              </div>
            )
          )}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={goBackToHome}
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Back to Home
          </button>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
