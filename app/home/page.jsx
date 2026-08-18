"use client";

import { MonitorPlay, NotepadText, Clock, Coffee, Clipboard, Calculator } from "lucide-react";
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
  const [endTimeMode, setEndTimeMode] = useState("default");
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

    const {
      workingLabel,
      breakLabel,
      breakCount,
      breakSessions,
      workingSeconds,
      breakSeconds,
    } = calculateWorkingHoursAndBreaks(swipes);

    setOutput(`Total working hours: ${workingLabel}`);
    setBreakInfo({
      breakLabel,
      breakCount,
      breakSessions,
      workingSeconds,
      breakSeconds,
    });
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputData(text);
    } catch (err) {
      // Clipboard access denied or unavailable; ignore silently.
    }
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

  const formatDurationCompact = (totalSecondsRaw) => {
    const hours = Math.floor(totalSecondsRaw / 3600);
    const minutes = Math.floor((totalSecondsRaw % 3600) / 60);
    const seconds = Math.floor(totalSecondsRaw % 60).toString().padStart(2, "0");
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const splitHoursMinutes = (totalSecondsRaw) => ({
    h: Math.floor(totalSecondsRaw / 3600),
    m: Math.floor((totalSecondsRaw % 3600) / 60),
  });

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
            shortLabel: formatDurationCompact(breakSeconds),
          });
        }
      }
    });

    return {
      workingLabel: formatDuration(totalWorkingSeconds),
      breakLabel: formatDuration(totalBreakSeconds),
      breakCount,
      breakSessions,
      workingSeconds: totalWorkingSeconds,
      breakSeconds: totalBreakSeconds,
    };
  };

  useEffect(() => {
    if (inputData.trim() === "") {
      setOutput("");
      setBreakInfo(null);
    }
  }, [inputData]);

  const workingHM = splitHoursMinutes(breakInfo?.workingSeconds ?? 0);
  const breakHM = splitHoursMinutes(breakInfo?.breakSeconds ?? 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--card-border)] bg-[var(--header-bg)]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Zentek Time Tracker</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowGuideModal(true)}
              title="Guide"
              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors"
            >
              <NotepadText className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              title="Video Tutorial"
              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors"
            >
              <MonitorPlay className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Calculate Working Hours
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] max-w-lg mx-auto">
            Paste your swipe logs below to calculate your effective working hours and breaks.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow)] overflow-hidden">
          <div className="p-5 sm:p-6">
            {/* Textarea */}
            <div className="mb-5">
              <label
                htmlFor="swipe-data"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2"
              >
                Swipe Data Logs
              </label>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  id="swipe-data"
                  className="w-full h-56 p-3.5 pr-12 text-sm leading-relaxed font-mono rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] resize-none transition-all"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder={"Paste your swipe logs here...\n\nExample:\nIN\n09:00:15 am\nOUT\n01:00:30 pm\nIN\n01:45:00 pm"}
                />
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  title="Paste from clipboard"
                  className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* OUT Time Source */}
            <div className="mb-5">
              <label
                htmlFor="endTimeMode"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2"
              >
                Out Time Source
              </label>
              <select
                id="endTimeMode"
                value={endTimeMode}
                onChange={(e) => {
                  const mode = e.target.value;
                  setEndTimeMode(mode);
                  if (mode === "current") setCurrentEndTime(getCurrentTimeStr());
                }}
                className="w-full sm:w-72 px-3.5 py-2.5 text-sm rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b93a7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
              >
                <option value="default">Default Time (6:30 PM)</option>
                <option value="current">Current Time</option>
                <option value="custom">Custom Time</option>
              </select>
            </div>

            {/* Current Time Row */}
            {endTimeMode === "current" && (
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-lg bg-[var(--input-bg)] border border-[var(--card-border)]">
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  Current OUT Time
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
                  {formatClock(currentEndTime)}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentEndTime(getCurrentTimeStr())}
                  className="sm:ml-auto text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] px-3 py-1.5 rounded-md hover:bg-[var(--primary-light)] transition-colors"
                >
                  Refresh
                </button>
              </div>
            )}

            {/* Custom Time Row */}
            {endTimeMode === "custom" && (
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-lg bg-[var(--input-bg)] border border-[var(--card-border)]">
                <label
                  htmlFor="customEndTime"
                  className="text-sm font-medium text-[var(--text-secondary)]"
                >
                  Custom OUT Time
                </label>
                <input
                  id="customEndTime"
                  type="time"
                  value={customEndTime}
                  onChange={(e) => setCustomEndTime(e.target.value)}
                  className="px-3.5 py-2 text-sm rounded-lg border border-[var(--input-border)] bg-[var(--card-bg)] text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] transition-all"
                />
              </div>
            )}

            {/* Calculate Button */}
            <button
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
              onClick={handleCalculate}
            >
              <Calculator className="w-4 h-4" />
              Calculate
            </button>

            {!breakInfo && output && (
              <p className="mt-4 text-sm text-red-400">{output}</p>
            )}
          </div>
        </div>

        {/* Results Section */}
        {breakInfo && (
          <div className="mt-6 space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--success-bg)] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-[var(--success)]" />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">Total Working Hours</span>
                </div>
                <div className="flex items-baseline gap-1 font-mono tabular-nums">
                  <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{workingHM.h}</span>
                  <span className="text-base text-[var(--text-muted)] mr-1.5">h</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{workingHM.m}</span>
                  <span className="text-base text-[var(--text-muted)]">m</span>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--warning-bg)] flex items-center justify-center">
                    <Coffee className="w-3.5 h-3.5 text-[var(--warning)]" />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">Total Break Time</span>
                </div>
                <div className="flex items-baseline gap-1 font-mono tabular-nums">
                  <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{breakHM.h}</span>
                  <span className="text-base text-[var(--text-muted)] mr-1.5">h</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{breakHM.m}</span>
                  <span className="text-base text-[var(--text-muted)]">m</span>
                </div>
              </div>
            </div>

            {/* Break Sessions Table */}
            {breakInfo.breakSessions.length > 0 && (
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--card-border)]">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Break Sessions
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                        <th className="text-left px-5 py-2.5">Session</th>
                        <th className="text-left px-5 py-2.5">Time Interval</th>
                        <th className="text-right px-5 py-2.5">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--card-border)]">
                      {breakInfo.breakSessions.map((session, i) => (
                        <tr
                          key={i}
                          className="hover:bg-[var(--surface-hover)] transition-colors"
                        >
                          <td className="px-5 py-3 text-[var(--text-primary)] font-medium whitespace-nowrap">
                            Break {i + 1}
                          </td>
                          <td className="px-5 py-3 text-[var(--text-secondary)] font-mono whitespace-nowrap">
                            {formatClock(session.start)} - {formatClock(session.end)}
                          </td>
                          <td className="px-5 py-3 text-right text-[var(--warning)] font-mono font-semibold whitespace-nowrap">
                            {session.shortLabel}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[var(--card-border)] bg-[var(--header-bg)]">
        <div id="developers" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8">
            Meet the Developers
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="inline-flex items-center gap-3 pl-2 pr-6 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)]">
              <span className="w-10 h-10 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-base font-semibold flex items-center justify-center">
                AB
              </span>
              <span className="text-base sm:text-lg font-medium text-[var(--text-primary)]">Aakash Burman</span>
            </div>
            <div className="inline-flex items-center gap-3 pl-2 pr-6 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)]">
              <span className="w-10 h-10 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-base font-semibold flex items-center justify-center">
                MS
              </span>
              <span className="text-base sm:text-lg font-medium text-[var(--text-primary)]">Mukul Singh</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Guide Modal */}
      {showGuideModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow-lg)] max-w-xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
              onClick={() => setShowGuideModal(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              How to Use
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-5">
              Follow these steps to calculate your working hours.
            </p>
            <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">1</span>
                <span>
                  <strong className="text-[var(--text-primary)]">Login to GreytHr:</strong>{" "}
                  <a
                    href="https://hiretek.greythr.com/"
                    target="blank"
                    className="text-[var(--primary)] hover:underline"
                  >
                    GreytHr
                  </a>{" "}
                  and log in with your credentials.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">2</span>
                <span>Go to attendance section.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">3</span>
                <span>Copy the swipe data from the &quot;Swipe In/Out&quot; section.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">4</span>
                <span>Paste the data in the text area above.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">5</span>
                <span>If one OUT time is missing, choose Default, Current, or Custom time from the dropdown to provide it.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">6</span>
                <span>Click &quot;Calculate&quot; to see the total working hours.</span>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow-lg)] max-w-4xl w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={() => setShowVideoModal(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
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
