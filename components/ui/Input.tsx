import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn(fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm outline-none transition",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",

          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300",

          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}