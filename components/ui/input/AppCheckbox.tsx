"use client";

import { useTheme } from "@/theme";
import { FiCheck } from "react-icons/fi";

interface AppCheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export default function AppCheckbox({
  checked,
  onChange,
  disabled = false,
  className = "",
}: AppCheckboxProps) {
  const { accentColor } = useTheme();

  return (
    <label
      className={`
        inline-flex items-center justify-center
        cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />

      <span
        className={`
          w-4 h-4 rounded
          border-2
          flex items-center justify-center
          transition-all duration-200
          bg-white dark:bg-slate-800
          border-slate-300 dark:border-slate-600
          hover:border-(--accent)
        `}
        style={{
          borderColor: checked ? accentColor : undefined,
          backgroundColor: checked ? accentColor : undefined,
        }}
      >
        <FiCheck
          size={12}
          className={`
            text-white
            transition-all duration-200
            ${checked ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
        />
      </span>
    </label>
  );
}