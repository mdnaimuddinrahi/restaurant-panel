"use client";

import React from "react";
import { useNativeSelectTheme } from "@/hooks/useNativeSelectTheme";

type Option = {
  label: string;
  value: string | number;
};

interface AppSelectProps {
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
}

export default function AppSelect({
  options,
  value,
  onChange,
  className,
}: AppSelectProps) {
  const theme = useNativeSelectTheme();

  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={className ?? theme.base}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}