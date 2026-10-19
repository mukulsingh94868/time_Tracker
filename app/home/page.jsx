"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InputForm from "@/components/calculator/InputForm";
import ResultsPanel from "@/components/results/ResultsPanel";
import GuideModal from "@/components/modals/GuideModal";
import VideoModal from "@/components/modals/VideoModal";
import useAttendanceCalculator from "@/hooks/useAttendanceCalculator";

export default function Home() {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const calculator = useAttendanceCalculator();
  const { attendance, summary, dayType } = calculator;

  const inputForm = <InputForm calculator={calculator} />;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--background)]">
      <Header onOpenGuide={() => setShowGuideModal(true)} onOpenVideo={() => setShowVideoModal(true)} />

      <main className="flex-1 min-h-0 overflow-hidden">
        {!attendance ? (
          <div className="h-full overflow-y-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl py-8">{inputForm}</div>
          </div>
        ) : (
          <div className="h-full flex flex-col lg:flex-row overflow-hidden">
            <div className="lg:w-1/2 h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
              <div className="max-w-xl mx-auto">{inputForm}</div>
            </div>
            <div className="lg:w-1/2 h-full overflow-hidden px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
              <ResultsPanel attendance={attendance} summary={summary} dayType={dayType} />
            </div>
          </div>
        )}
      </main>

      <Footer />

      {showGuideModal && <GuideModal onClose={() => setShowGuideModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
    </div>
  );
}
