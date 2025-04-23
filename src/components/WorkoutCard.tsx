"use client";

import { ReactNode, useState } from "react";

interface WorkoutCardProps {
  _id: string;
  title: string;
  day: string;
  duration: string;
  time: string;
  details: string[];
  onEdit: () => void;
  onDelete: (id: string) => void;
  children: ReactNode; // This will be the image component
}

export default function WorkoutCard({
  _id,
  title,
  day,
  duration,
  time,
  details,
  onEdit,
  onDelete,
  children,
}: WorkoutCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title,
    day,
  });

  const handleEditSubmit = async () => {
    const res = await fetch(`/api/workoutDay/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm }),
    });
    const result = await res.json();
    console.log("Updated workout:", result);
    setIsEditOpen(false);
  };

  return (
    <div className="border-4 border-red-700 rounded-lg p-6 bg-white shadow-xl w-80 flex-shrink-0 mx-4 flex flex-col">
      {/* Image is here but will later be replace by diff images per workout*/}
      {children}

      <h2 className="text-xl font-semibold mb-1 text-red-700">{title}</h2>
      <p className="text-gray-600 mb-4 font-medium">{day}</p>
      <p className="text-gray-700 mb-1 font-medium">{duration}</p>
      <p className="text-gray-700 mb-4 font-medium">{time}</p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-black hover:underline mb-4"
      >
        View Details
      </button>
      {/* all the buttons here to edit/delete (NOT IMPLEMENTED YET) */}
      <div className="flex justify-between mt-auto">
        <button
          onClick={() => setIsEditOpen(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      {/* Modal for view details mode*/}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-red-700">{title}</h2>
            <p className="text-gray-600 mb-4">{day}</p>
            <p className="text-gray-700 mb-1">{duration}</p>
            <p className="text-gray-700 mb-4">{time}</p>
            <ul className="text-left text-gray-800 mb-4 space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="list-disc list-inside">
                  {detail}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Modal for edit details mode*/}
      {isEditOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-red-700">{title}</h2>

            <div className="mb-4">
              <label
                htmlFor="day"
                className="block text-gray-700 font-medium mb-2"
              >
                Day
              </label>
              <select
                id="day"
                value={editForm.day}
                onChange={(e) =>
                  setEditForm({ ...editForm, day: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div className="flex justify-between mt-auto">
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
