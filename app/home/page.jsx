"use client";

import { MonitorPlay, NotepadText } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [isDefaultEndTime, setIsDefaultEndTime] = useState(true);
  const [customEndTime, setCustomEndTime] = useState("18:30:00");
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleCalculate = () => {
    const todaysSwipes = parseSwipeData(inputData, isDefaultEndTime, customEndTime);
    const swipes = convertData(todaysSwipes);
    if (!swipes) return;
    const workingHours = calculateWorkingHours(swipes);
    setOutput(`Total working hours: ${workingHours}`);
  };

  const parseSwipeData = (data, useDefault, customEnd = "18:30:00") => {
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

          times?.push(
            `${hours?.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds?.toString()?.padStart(2, "0")}`
          );
        }
      }
    });

    if (times?.length % 2 !== 0) {
      times?.push(useDefault ? "18:30:00" : customEnd);
    }

    return times;
  };

  const convertData = (data) => {
    if (!data || data.length % 2 !== 0) {
      setOutput("End time missing!");
      return null;
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
        {/* Top Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          {[["Guide", setShowGuideModal, NotepadText], ["Video", setShowVideoModal, MonitorPlay]]?.map(([_, handler, Icon], i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 rounded-full animate-border-glow bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 z-0"></div>
              <button
                onClick={() => handler(true)}
                className="w-10 h-10 rounded-full shadow-xl flex items-center justify-center text-lg font-bold text-white z-10 cursor-pointer transform transition duration-300 group-hover:scale-110 group-hover:-rotate-6"
              >
                <Icon />
              </button>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-indigo-300 mb-6 text-center tracking-wide">
            Calculate Working Hours
          </h2>

          <textarea
            className="w-full h-64 p-4 rounded-lg bg-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-6"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter swipe data here..."
          />

          <div className="flex items-center mb-4">
            <input
              checked={isDefaultEndTime}
              onChange={() => setIsDefaultEndTime((prev) => !prev)}
              id="defaultEndTime"
              type="checkbox"
              className="accent-indigo-500 w-4 h-4"
            />
            <label htmlFor="defaultEndTime" className="ml-2 text-sm text-gray-200">
              Use Default OUT Time (6:30 PM)
            </label>
          </div>

          {!isDefaultEndTime && (
            <div className="mb-6 ml-1 w-full flex items-center gap-4 bg-white/10 border border-white/20 p-3 rounded-lg shadow-inner transition duration-300">
              <label htmlFor="customEndTime" className="text-sm font-medium text-indigo-200 w-40">
                ⏰ Custom OUT Time:
              </label>
              <input
                id="customEndTime"
                type="time"
                value={customEndTime}
                onChange={(e) => setCustomEndTime(e.target.value)}
                className="bg-white/20 text-white border border-white/30 backdrop-blur-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-40 transition-all duration-300"
              />
            </div>
          )}

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md mb-4"
            onClick={handleCalculate}
          >
            Calculate
          </button>

          {output && (
            <div className="mt-4 text-center text-xl font-semibold text-indigo-100">
              {output}
            </div>
          )}
        </div>
      </div>

      {/* Developer Section */}
      <div className="w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-10 px-4">
        <div className="text-3xl font-bold mb-6 tracking-wide text-indigo-300">
          Meet the Developers
        </div>
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-[600px] items-center gap-4 text-lg">
          <div className="bg-white/10 hover:bg-white/20 transition-all rounded-xl px-6 py-4 shadow-lg w-full sm:w-1/2 text-center font-medium text-indigo-100">
            Aakash Burman
          </div>
          <div className="bg-white/10 hover:bg-white/20 transition-all rounded-xl px-6 py-4 shadow-lg w-full sm:w-1/2 text-center font-medium text-indigo-100">
            Mukul Singh
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative text-gray-900">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black font-bold"
              onClick={() => setShowGuideModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">How to Use</h3>
            <ol className="space-y-2 text-sm">
              <li>
                1. <strong>Login to GreytHr:</strong>{" "}
                <a
                  href="https://hiretek.greythr.com/"
                  target="blank"
                  className="text-indigo-500 hover:underline"
                >
                  GreytHr
                </a>{" "}
                and log in with your credentials.
              </li>
              <li>2. Go to attendance section.</li>
              <li>3. Copy the swipe data from the "Swipe In/Out" section.</li>
              <li>4. Paste the data in the text area above.</li>
              <li>5. If one OUT time is missing, provide it via the checkbox or custom time.</li>
              <li>6. Click "Calculate" to see the total working hours.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 max-w-2xl w-full relative">
            <button
              className="absolute top-0 right-1 text-gray-600 hover:text-black font-bold"
              onClick={() => setShowVideoModal(false)}
            >
              ✕
            </button>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="/assets/tutorial.mp4"
                title="Working Hours Guide"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
