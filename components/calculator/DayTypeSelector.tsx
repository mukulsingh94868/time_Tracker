"use client";

import RadioCardGroup from "@/components/ui/RadioCardGroup";
import { DAY_TYPES, DAY_TYPE_KEYS } from "@/constants/attendance";
import { formatHoursLabel } from "@/utils/time";
import type { DayTypeKey } from "@/types/attendance";

interface DayTypeSelectorProps {
  value: DayTypeKey;
  onChange: (dayType: DayTypeKey) => void;
}

const DAY_TYPE_OPTIONS = DAY_TYPE_KEYS.map((key) => ({
  value: key,
  label: DAY_TYPES[key].label,
  description: formatHoursLabel(DAY_TYPES[key].requiredSeconds),
}));

export default function DayTypeSelector({ value, onChange }: Readonly<DayTypeSelectorProps>) {
  return (
    <RadioCardGroup
      name="day-type"
      legend="Working day type"
      options={DAY_TYPE_OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}
