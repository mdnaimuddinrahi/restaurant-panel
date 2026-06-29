"use client";

import { useState } from "react";
import { useTheme } from "@/theme";
import { AppInputProps } from "@/store/commonInterface";


{/* <FormInput
  label="Employee Name"
  required
  // icon={<FiSearch size={16} />}
  placeholder="Enter employee name"
/>
<FormInput
  label="Email Address"
  required
  // value={email}
  error="email is required"
/>
<FormInput
  label="Phone Number"
  placeholder="01XXXXXXXXX"
/>
<FormInput
  label="Employee Name"
  required
  // icon={<FiSearch size={16} />}
  icon={<FaUserAstronaut size={16}/>}
  placeholder="Enter employee name"
/> */}

export default function Input({
  label,
  required,
  error,
  icon,
  className = "",
  ...props
}: AppInputProps) {
  const { accentColor } = useTheme();
  const [focused, setFocused] = useState(false);

  const isError = !!error;

  return (
    <div className="w-full">
      {/* LABEL */}
      {label && (
        <label
          className={`
            mb-1.5 block text-xs font-medium transition-colors duration-300
            ${
              isError
                ? "text-red-500"
                : "text-slate-500 dark:text-slate-200"
            }
          `}
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div className="relative">
        {/* ICON */}
        {icon && (
          <div
            className={`
              absolute left-3 top-1/2 -translate-y-1/2
              transition-all duration-300
              ${
                isError
                  ? "text-red-500"
                  : focused
                  ? "scale-110"
                  : "text-slate-400"
              }
            `}
            style={{
              color:
                isError
                  ? undefined
                  : focused
                  ? accentColor
                  : undefined,
            }}
          >
            {icon}
          </div>
        )}

        {/* INPUT */}
        <input
          {...props}
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
            py-2.5 text-sm outline-none
            text-slate-900 dark:text-slate-100
            transition-all duration-300

            ${
              icon
                ? "pl-10 pr-3"
                : "px-3"
            }

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
      </div>

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

