"use client";

import { useState } from "react";
import { useTheme } from "@/theme";
import { FiSearch } from "react-icons/fi";

export default function AppInput(props: any) {
  const { accentColor } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      {/* ICON */}
      <FiSearch
        className={`
          absolute left-3 top-1/2 -translate-y-1/2
          transition-all duration-300 ease-in-out
          ${
            focused
              ? "scale-110 text-[var(--accent)]"
              : "scale-100 text-slate-400"
          }
        `}
        style={{
          color: focused ? accentColor : undefined,
        }}
      />

      {/* INPUT */}
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          e.target.style.borderColor = accentColor;
          e.target.style.boxShadow = `0 0 0 2px ${accentColor}25`;
        }}
        onBlur={(e) => {
          setFocused(false);
          e.target.style.borderColor = "";
          e.target.style.boxShadow = "";
        }}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm pl-9
          bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          border-slate-300 dark:border-slate-700
          outline-none transition-all duration-200
        `}
      />
    </div>
  );
}