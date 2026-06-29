"use client";

import {
  useState,
  useRef,
  useEffect,
  InputHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  format,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addDays,
} from "date-fns";
import { hexToRgba, useTheme } from "@/theme";
import AppCustomButton from "../button/AppCustomButton";

interface AppDatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  label?: string;
  required?: boolean;
  error?: string;
  value?: Date;
  placeholder?: string;
  onChange?: (date?: Date) => void;
}

export default function AppDatePicker({
  label,
  required,
  error,
  value,
  placeholder = "Select Date",
  className = "",
  onChange,
}: AppDatePickerProps) {
  const { accentColor } = useTheme();

  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(
    value ?? new Date()
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isError = !!error;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const rows = [];

    let day = calendarStart;

    while (day <= calendarEnd) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        const selected =
          value && isSameDay(cloneDay, value);

        const today = isToday(cloneDay);

        const isCurrentMonth =
          cloneDay.getMonth() ===
          currentMonth.getMonth();

        days.push(
          <button
            key={cloneDay.toISOString()}
            type="button"
            onClick={() => {
              onChange?.(cloneDay);
              setOpen(false);
              setFocused(false);
            }}
            className={`
              relative flex h-10 w-10 items-center justify-center
              rounded-lg text-sm font-medium
              transition-all duration-200 ease-out

              ${
                !isCurrentMonth
                  ? "text-slate-300 dark:text-slate-600"
                  : "text-slate-700 dark:text-slate-200"
              }
            `}
            style={{
              backgroundColor: selected
                ? accentColor
                : undefined,

              color: selected
                ? "#fff"
                : undefined,

              border:
                today && !selected
                  ? `1.5px solid ${accentColor}`
                  : undefined,
            }}
            onMouseEnter={(e) => {
              if (!selected) {
                e.currentTarget.style.backgroundColor =
                  `${accentColor}15`;
              }
            }}
            onMouseLeave={(e) => {
              if (!selected) {
                e.currentTarget.style.backgroundColor =
                  "";
              }
            }}
          >
            {format(cloneDay, "d")}
          </button>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div
          key={day.toISOString()}
          className="flex justify-between"
        >
          {days}
        </div>
      );
    }

    return rows;
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className}`}
    >
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

      {/* INPUT */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setFocused(true);
        }}
        className={`
          relative w-full rounded-lg border bg-white dark:bg-slate-800
          py-2.5 text-sm outline-none text-left
          text-slate-900 dark:text-slate-100
          transition-all duration-300

          pl-10 pr-3

          ${
            isError
              ? `
                border-red-500
                text-red-600
              `
              : `
                border-slate-300
                dark:border-slate-700
              `
          }
        `}
        style={{
          borderColor:
            focused && !isError
              ? accentColor
              : undefined,

          boxShadow:
            focused && !isError
              ? `0 0 0 3px ${accentColor}20`
              : undefined,
        }}
      >
        <FiCalendar
          className={`
            absolute left-3 top-1/2 -translate-y-1/2
            transition-all duration-300
            ${
              focused
                ? "scale-110"
                : "text-slate-400"
            }
          `}
          style={{
            color:
              focused && !isError
                ? accentColor
                : undefined,
          }}
        />

        {value ? (
          format(value, "dd MMM yyyy")
        ) : (
          <span className="text-slate-400">
            {placeholder}
          </span>
        )}
      </button>

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

      {/* CALENDAR */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute left-0 z-50 mt-2

              w-[320px]

              rounded-xl
              border border-slate-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              p-4

              shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            "
          >
            {/* HEADER */}
            <div className="mb-4 flex items-center justify-between">
              <AppCustomButton
                type="button"
                onClick={() =>
                  setCurrentMonth((prev) =>
                    subMonths(prev, 1)
                  )
                } 
                variant="ghost" className="h-9 w-9"> <FiChevronLeft /></AppCustomButton>
              

              <h3 className="text-sm font-semibold">
                {format(currentMonth, "MMMM - yyyy")}
              </h3>
              <AppCustomButton 
                type="button"
                onClick={() =>
                  setCurrentMonth((prev) =>
                    addMonths(prev, 1)
                  )
                }
                variant="ghost" className="h-9 w-9"> <FiChevronRight /></AppCustomButton>
              
            </div>

            {/* WEEKDAYS */}
            <div className="mb-2 flex justify-between">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                (day) => (
                  <div
                    key={day}
                    className="
                      w-10 text-center
                      text-xs font-medium
                      text-slate-400
                    "
                  >
                    {day}
                  </div>
                )
              )}
            </div>

            {/* DAYS */}
            <div className="space-y-1">
              {renderCalendar()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}