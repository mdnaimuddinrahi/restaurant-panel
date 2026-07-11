"use client";

import { TextareaHTMLAttributes, useState } from "react";
import { useTheme } from "@/theme";
import Label from "../Label";

interface AppTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?:string;
  required?: boolean;
  error?: string;
}

export default function TextArea({
  label,
  name,
  required,
  error,
  className = "",
  ...props
}: AppTextareaProps) {
  const { accentColor } = useTheme();
  const [focused, setFocused] = useState(false);

  const isError = !!error;

  return (
    <div className="w-full">
      {/* LABEL */}
      {label && (
        <Label
          htmlFor={name}
          label={label}
          required={required}
          isError={!!error}
        />
      )}

      {/* TEXTAREA */}
      <textarea
        {...props}
        id={name}
        onFocus={(e) => {
          setFocused(true);

          if (!isError) {
            e.target.style.borderColor = accentColor;
            e.target.style.boxShadow = `0 0 0 3px ${accentColor}20`;
          }

          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);

          if (!isError) {
            e.target.style.borderColor = "";
            e.target.style.boxShadow = "";
          }

          props.onBlur?.(e);
        }}
        className={`
          w-full rounded-lg border bg-white dark:bg-slate-800
          px-3 py-2.5 text-sm outline-none resize-y
          text-slate-900 dark:text-slate-100
          transition-all duration-300

          ${
            isError
              ? `
                border-red-500
                text-red-600
                placeholder:text-red-300
                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/10
              `
              : `
                border-slate-300
                dark:border-slate-700
              `
          }

          ${className}
        `}
      />

      {/* ERROR */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${
            isError
              ? "mt-1 max-h-10 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <p className="text-xs text-red-500">
          {error}
        </p>
      </div>
    </div>
  );
}