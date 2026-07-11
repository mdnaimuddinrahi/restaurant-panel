"use client";

import { InputHTMLAttributes } from "react";
import { useTheme } from "@/theme";
import Label from "../Label";

interface AppSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  name?: string;
  required?: boolean;
  error?: string;
}

export default function Switch({
  label,
  name,
  required,
  error,
  checked,
  className = "",
  ...props
}: AppSwitchProps) {
  const { accentColor } = useTheme();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        {label && (
          <Label
            htmlFor={name}
            label={label}
            required={required}
            isError={!!error}
          />
        )}

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id={name}
            type="checkbox"
            checked={checked}
            {...props}
            className="peer sr-only"
          />

          {/* Track */}
          <div
            className={`
              relative h-6 w-10 rounded-full
              transition-all duration-300
              ${
                error
                  ? "bg-red-100 border border-red-400"
                  : "bg-slate-200 dark:bg-slate-700"
              }
            `}
            style={{
              backgroundColor:
                checked && !error
                  ? `${accentColor}30`
                  : undefined,
            }}
          >
            {/* Thumb */}
            <span
              className={`
                absolute top-0.5 left-0.5
                h-5 w-5 rounded-full
                bg-white
                shadow-md
                transition-all duration-300
                ${
                  checked
                    ? "translate-x-4"
                    : "translate-x-0"
                }
              `}
              style={{
                backgroundColor:
                  checked && !error
                    ? accentColor
                    : undefined,
              }}
            />
          </div>
        </label>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}