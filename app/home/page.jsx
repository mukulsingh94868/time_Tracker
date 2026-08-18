"use client";

import { MonitorPlay, NotepadText } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const getCurrentTimeStr = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
};

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [endTimeMode, setEndTimeMode] = useState("default"); // "default" | "current" | "custom"
  const [customEndTime, setCustomEndTime] = useState("18:30:00");
  const [currentEndTime, setCurrentEndTime] = useState(getCurrentTimeStr());
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [breakInfo, setBreakInfo] = useState(null);

  const textareaRef = useRef(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleCalculate = () => {
    let effectiveEndTime = "18:30:00";
    if (endTimeMode === "custom") effectiveEndTime = customEndTime;
    if (endTimeMode === "current") effectiveEndTime = currentEndTime;

    const todaysSwipes = parseSwipeData(inputData, effectiveEndTime);
    const swipes = convertData(todaysSwipes);
    if (!swipes) return;

    const { workingLabel, breakLabel, breakCount, breakSessions } =
      calculateWorkingHoursAndBreaks(swipes);

    setOutput(`Total working hours: ${workingLabel}`);
    setBreakInfo({
      breakLabel,
      breakCount,
      breakSessions,
    });
  };

  const parseSwipeData = (data, endTime) => {
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
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          );
        }
      }
    });

    if (times.length % 2 !== 0) {
      times.push(endTime);
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

  const formatDuration = (totalSecondsRaw) => {
    const hours = Math.floor(totalSecondsRaw / 3600);
    const minutes = Math.floor((totalSecondsRaw % 3600) / 60);
    const seconds = Math.floor(totalSecondsRaw % 60);
    return `${hours} hr : ${minutes} min : ${seconds} sec`;
  };

  const formatClock = (time) => {
    const [h, m, s] = time.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")} ${period}`;
  };

  const calculateWorkingHoursAndBreaks = (swipes) => {
    let totalWorkingSeconds = 0;
    let totalBreakSeconds = 0;
    let breakCount = 0;
    const breakSessions = [];

    swipes.forEach(([swipeIn, swipeOut], index) => {
      const timeIn = new Date(`1970-01-01T${swipeIn}Z`);
      const timeOut = new Date(`1970-01-01T${swipeOut}Z`);
      totalWorkingSeconds += (timeOut.getTime() - timeIn.getTime()) / 1000;

      const nextPair = swipes[index + 1];
      if (nextPair) {
        const nextIn = new Date(`1970-01-01T${nextPair[0]}Z`);
        const breakSeconds = (nextIn.getTime() - timeOut.getTime()) / 1000;
        if (breakSeconds > 0) {
          totalBreakSeconds += breakSeconds;
          breakCount += 1;
          breakSessions.push({
            start: swipeOut,
            end: nextPair[0],
            label: formatDuration(breakSeconds),
          });
        }
      }
    });

    return {
      workingLabel: formatDuration(totalWorkingSeconds),
      breakLabel: formatDuration(totalBreakSeconds),
      breakCount,
      breakSessions,
    };
  };

  useEffect(() => {
    if (inputData.trim() === "") {
      setOutput("");
      setBreakInfo(null);
    }
  }, [inputData]);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-10 text-white">
        {/* Top Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          {[
            ["Guide", setShowGuideModal, NotepadText],
            ["Video", setShowVideoModal, MonitorPlay],
          ]?.map(([_, handler, Icon], i) => (
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
            ref={textareaRef} // auto focus
            className="w-full h-64 p-4 rounded-lg bg-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-6"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter swipe data here..."
          />

          <div className="mb-4">
            <label
              htmlFor="endTimeMode"
              className="block text-sm text-gray-200 mb-2"
            >
              OUT Time Source
            </label>
            <select
              id="endTimeMode"
              value={endTimeMode}
              onChange={(e) => {
                const mode = e.target.value;
                setEndTimeMode(mode);
                if (mode === "current") setCurrentEndTime(getCurrentTimeStr());
              }}
              className="w-full bg-white/20 text-white border border-white/30 backdrop-blur-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <option className="text-black" value="default">
                Default Time (6:30 PM)
              </option>
              <option className="text-black" value="current">
                Current Time
              </option>
              <option className="text-black" value="custom">
                Custom Time
              </option>
            </select>
          </div>

          {endTimeMode === "current" && (
            <div className="mb-6 ml-1 w-full flex items-center gap-4 bg-white/10 border border-white/20 p-3 rounded-lg shadow-inner transition duration-300">
              <span className="text-sm font-medium text-indigo-200 w-40">
                🕒 Current OUT Time:
              </span>
              <span className="flex-1 text-white font-semibold">
                {formatClock(currentEndTime)}
              </span>
              <button
                type="button"
                onClick={() => setCurrentEndTime(getCurrentTimeStr())}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md transition-all duration-200"
              >
                Refresh
              </button>
            </div>
          )}

          {endTimeMode === "custom" && (
            <div className="mb-6 ml-1 w-full flex items-center gap-4 bg-white/10 border border-white/20 p-3 rounded-lg shadow-inner transition duration-300">
              <label
                htmlFor="customEndTime"
                className="text-sm font-medium text-indigo-200 w-40"
              >
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

          {breakInfo && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                <span className="text-slate-300">Breaks taken</span>
                <span className="font-semibold text-white">
                  {breakInfo.breakCount}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                <span className="text-slate-300">Total break time</span>
                <span className="font-semibold text-emerald-300">
                  {breakInfo.breakLabel}
                </span>
              </div>
            </div>
          )}

          {breakInfo && breakInfo.breakSessions.length > 0 && (
            <div className="mt-4 rounded-lg bg-white/10 p-3">
              <div className="text-xs font-semibold text-slate-300 mb-2 text-center uppercase tracking-wide">
                Break Sessions
              </div>
              <div className="flex flex-col gap-1.5">
                {breakInfo.breakSessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs sm:text-sm bg-white/5 rounded-md px-3 py-2"
                  >
                    <span className="text-slate-300">
                      Break {i + 1}{" "}
                      <span className="text-slate-400">
                        ({formatClock(session.start)} - {formatClock(session.end)})
                      </span>
                    </span>
                    <span className="font-semibold text-emerald-300">
                      {session.label}
                    </span>
                  </div>
                ))}
              </div>
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
              <li>
                5. If one OUT time is missing, choose Default, Current, or
                Custom time from the dropdown to provide it.
              </li>
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
