"use client";

interface RadioCardOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

interface RadioCardGroupProps<T extends string> {
  name: string;
  legend: string;
  options: RadioCardOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function RadioCardGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: Readonly<RadioCardGroupProps<T>>) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-[var(--text-secondary)]">{legend}</legend>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isActive}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full flex-col items-start rounded-xl border px-3 py-2.5 transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] ${
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary-light)]"
                    : "border-[var(--input-border)] bg-[var(--input-bg)] hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                >
                  {option.label}
                </span>
                <span
                  className={`text-xs tabular-nums ${isActive ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}
                >
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
