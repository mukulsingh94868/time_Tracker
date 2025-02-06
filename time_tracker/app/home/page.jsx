"use client";

import { useState } from "react";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [isDefaultEndTime, setIsDefaultEndTime] = useState(false);

  const handleCalculate = () => {
    const todaysSwipes = parseSwipeData(inputData, isDefaultEndTime);
    const swipes = convertData(todaysSwipes);
    if (!swipes) return
    const workingHours = calculateWorkingHours(swipes);
    setOutput(`Total working hours: ${workingHours}`);
  };

  const parseSwipeData = (data, addDefaultEndTime) => {
    const lines = data
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const times = [];

    lines.forEach((line, index) => {
      if (line.startsWith("IN") || line.startsWith("OUT")) {
        const timeLine = lines[index + 1];
        const timeMatch = timeLine?.match(/(\d{2}:\d{2}:\d{2}) (am|pm)/i);
        if (timeMatch) {
          const [, time, period] = timeMatch;
          let [hours, minutes, seconds] = time.split(":").map(Number);

          if (period.toLowerCase() === "pm" && hours < 12) hours += 12;
          if (period.toLowerCase() === "am" && hours === 12) hours = 0;

          times.push(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }
      }
    });

    // Append Default End Time if checkbox is checked
    if (addDefaultEndTime && times.length % 2 !== 0) {
      times.push("18:30:00"); // Adding OUT 18:30:00 as default
    }

    return times;
  };

  const convertData = (data) => {
    if (!data || data.length % 2 !== 0) {
      setOutput("End time missing!");
      return null; // Returning null instead of false
    }

    return data.reduce((acc, _, i, arr) => {
      if (i % 2 === 0 && arr[i + 1]) {
        acc.push([arr[i], arr[i + 1]]);
      }
      return acc;
    }, []);
  };


  const calculateWorkingHours = (swipes) => {
    let totalWorkingSeconds = 0;

    swipes.forEach(([swipeIn, swipeOut]) => {
      const timeIn = new Date(`1970-01-01T${swipeIn}Z`);
      const timeOut = new Date(`1970-01-01T${swipeOut}Z`);
      totalWorkingSeconds += (timeOut.getTime() - timeIn.getTime()) / 1000;
    });

    const totalHours = Math.floor(totalWorkingSeconds / 3600);
    const totalMinutes = Math.floor((totalWorkingSeconds % 3600) / 60);
    const totalSeconds = Math.floor(totalWorkingSeconds % 60);

    return `${totalHours} hr : ${totalMinutes} min : ${totalSeconds} sec`;
  };

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Calculate Working Hours</h2>
      <textarea
        className="w-full h-96 max-w-lg p-2 border rounded mb-4"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter swipe data here..."
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleCalculate}
      >
        Calculate
      </button>

      <div className="flex items-center mt-4">
        <input
          checked={isDefaultEndTime}
          onChange={() => setIsDefaultEndTime((prev) => !prev)}
          id="defaultEndTime"
          type="checkbox"
        />
        <label htmlFor="defaultEndTime" className="ml-2 select-none">
          Add Default End Time
        </label>
      </div>
      <div className="mt-4 text-lg font-semibold">{output}</div>
    </div>
  );
}
