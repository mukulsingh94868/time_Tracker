"use client";

import { useState } from "react";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [isDefaultEndTime, setIsDefaultEndTime] = useState(true);

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
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-10 text-white">
        <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-indigo-300 mb-6 text-center tracking-wide">
            Calculate Working Hours
          </h2>

          <textarea
            className="w-full h-64 p-4 rounded-lg bg-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-6"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter swipe data here..."
          ></textarea>

          <div className="flex items-center mb-6">
            <input
              checked={isDefaultEndTime}
              onChange={() => setIsDefaultEndTime((prev) => !prev)}
              id="defaultEndTime"
              type="checkbox"
              className="accent-indigo-500 w-4 h-4"
            />
            <label htmlFor="defaultEndTime" className="ml-2 text-sm text-gray-200">
              Add Default End Time
            </label>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md"
            onClick={handleCalculate}
          >
            Calculate
          </button>

          {output && (
            <div className="mt-6 text-center text-xl font-semibold text-indigo-100">
              {output}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-10 px-4">
        <div className="text-3xl font-bold mb-6 tracking-wide text-indigo-300">Meet the Developers</div>
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-[600px] items-center gap-4 text-lg">
          <div className="bg-white/10 hover:bg-white/20 transition-all rounded-xl px-6 py-4 shadow-lg w-full sm:w-1/2 text-center font-medium text-indigo-100">
            Aakash Burman
          </div>
          <div className="bg-white/10 hover:bg-white/20 transition-all rounded-xl px-6 py-4 shadow-lg w-full sm:w-1/2 text-center font-medium text-indigo-100">
            Mukul Singh
          </div>
        </div>
      </div>
    </div>
  );
}
