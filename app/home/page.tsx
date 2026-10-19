"use client";

import InputForm from "@/components/calculator/InputForm";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import GuideModal from "@/components/modals/GuideModal";
import VideoModal from "@/components/modals/VideoModal";
import ResultsPanel from "@/components/results/ResultsPanel";
import useAttendanceCalculator from "@/hooks/useAttendanceCalculator";
import { readClipboardText } from "@/services/clipboardService";
import { useState } from "react";

export default function Home() {
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const calculator = useAttendanceCalculator();
  const { attendance, summary, dayType, error, setInputData } = calculator;

  const handlePasteFromClipboard = async () => {
    const text = await readClipboardText();
    if (text) setInputData(text);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenGuide={() => setShowGuideModal(true)} onOpenVideo={() => setShowVideoModal(true)} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Working hours calculator
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
            Paste your swipe log to see your effective working hours, breaks, and when you can leave.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <InputForm calculator={calculator} onPaste={handlePasteFromClipboard} />
          <ResultsPanel
            attendance={attendance}
            summary={summary}
            dayType={dayType}
            error={error}
            onPaste={handlePasteFromClipboard}
          />
        </div>
      </main>

      <Footer />

      {showGuideModal && <GuideModal onClose={() => setShowGuideModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
    </div>
  );
}
