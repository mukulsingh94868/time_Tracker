"use client";

import { ChevronRight } from "lucide-react";
import ExternalLinkButton from "@/components/ui/ExternalLinkButton";
import useNow from "@/hooks/useNow";
import { DAY_TYPES } from "@/constants/attendance";
import { GREYTHR_URL } from "@/constants/links";
import {
  formatClock,
  formatClockShort,
  formatHoursLabel,
  formatLongDate,
  formatTimeLeft,
  fromSeconds,
  getGreeting,
  toSeconds,
  toTimeString,
} from "@/utils/time";
import type { Attendance, DayTypeKey, TargetSummary } from "@/types/attendance";

interface WelcomeHeroProps {
  attendance: Attendance | null;
  summary: TargetSummary | null;
  dayType: DayTypeKey;
}

const GETTING_STARTED_STEPS = ["Open GreytHr", "Copy Swipe In/Out", "Paste into Swipe data"];

const Highlight = ({ children }: Readonly<{ children: string }>) => (
  <span className="font-semibold text-[var(--text-primary)]">{children}</span>
);

interface StatusLineProps extends WelcomeHeroProps {
  nowSeconds: number | null;
}

function StatusLine({ attendance, summary, dayType, nowSeconds }: Readonly<StatusLineProps>) {
  if (!attendance || !summary) {
    return <>Paste today&apos;s swipe log to see your hours, breaks and the exact time you can leave.</>;
  }

  const target = formatHoursLabel(summary.requiredSeconds);

  if (summary.completionSeconds === null) {
    return (
      <>
        You&apos;ve worked <Highlight>{formatHoursLabel(attendance.workingSeconds)}</Highlight>,{" "}
        <Highlight>{formatHoursLabel(Math.abs(summary.remainingSeconds))}</Highlight> short of your {target}{" "}
        {DAY_TYPES[dayType].label.toLowerCase()}.
      </>
    );
  }

  const completion = formatClockShort(fromSeconds(summary.completionSeconds));

  if (nowSeconds === null) {
    return (
      <>
        Your {target} will be complete at <Highlight>{completion}</Highlight>.
      </>
    );
  }

  const secondsLeft = summary.completionSeconds - nowSeconds;
  if (secondsLeft > 0) {
    return (
      <>
        You can leave at <Highlight>{completion}</Highlight>, in <Highlight>{formatTimeLeft(secondsLeft)}</Highlight>.
      </>
    );
  }

  return (
    <>
      Target met. Your {target} were complete at <Highlight>{completion}</Highlight>. Enjoy the rest of your day.
    </>
  );
}

export default function WelcomeHero({ attendance, summary, dayType }: Readonly<WelcomeHeroProps>) {
  const now = useNow();

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[var(--primary)] opacity-[0.12] blur-3xl"
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            {now ? formatLongDate(now) : "Today"}
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {now ? getGreeting(now) : "Welcome back"}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            <StatusLine
              attendance={attendance}
              summary={summary}
              dayType={dayType}
              nowSeconds={now ? toSeconds(toTimeString(now)) : null}
            />
          </p>

          {!attendance && (
            <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-[var(--text-secondary)]">
              {GETTING_STARTED_STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--card-border)] bg-[var(--surface-raised)] py-1 pl-1 pr-2.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary-light)] text-[10px] font-semibold text-[var(--primary)]">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                  {i < GETTING_STARTED_STEPS.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex shrink-0 items-end justify-between gap-4 border-t border-[var(--card-border)] pt-5 md:flex-col md:items-end md:border-t-0 md:pt-0">
          <div className="md:text-right">
            <p className="text-xs text-[var(--text-muted)]">Current time</p>
            {now ? (
              <p className="whitespace-nowrap font-mono text-xl font-semibold tabular-nums text-[var(--text-primary)] sm:text-3xl">
                {formatClock(toTimeString(now))}
              </p>
            ) : (
              <span className="mt-1 block h-8 w-40 rounded-md bg-[var(--surface-raised)] motion-safe:animate-pulse" />
            )}
          </div>
          <ExternalLinkButton href={GREYTHR_URL}>Open GreytHr</ExternalLinkButton>
        </div>
      </div>
    </section>
  );
}
