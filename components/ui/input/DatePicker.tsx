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
  setMonth,
  setYear,
  parse,
  isValid
} from "date-fns";
import { hexToRgba, useTheme } from "@/theme";
import AppCustomButton from "../button/AppCustomButton";
import AppSelect from "./AppSelect";


export interface AppDatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  label?: string;
  required?: boolean;
  error?: string;
  value?: Date | null;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
}

export default function DatePicker({
  label,
  required,
  error,
  value,
  placeholder = "yyyy-mm-dd",
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

  // keep currentMonth in sync when value (selected date) changes
  useEffect(() => {
    if (value) {
      setCurrentMonth(value);
    }
  }, [value]);

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

              setInputValue(format(cloneDay, "yyyy-MM-dd"));
              setCurrentMonth(cloneDay);

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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 120 },
    (_, i) => new Date().getFullYear() - i
  );

  const monthOptions = months.map((month, index) => ({
    value: index,
    label: month,
  }));

  const yearOptions = years.map((year) => ({
    value: year,
    label: String(year),
  }));

   // Add this
  const [inputValue, setInputValue] = useState(
    value ? format(value, "yyyy-MM-dd") : ""
  );


  // Add this

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  let value = e.target.value;

  // Allow only digits and hyphens
  value = value.replace(/[^\d-]/g, "");

  const digits = value.replace(/-/g, "").slice(0, 8);

  let formatted = digits;

  if (digits.length > 4) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  if (digits.length > 6) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  }

  setInputValue(formatted);

  // ✅ User cleared the input
  if (formatted === "") {
    setCurrentMonth(new Date());
    onChange?.(null); // or "" if your component uses string values
    return;
  }

  // Only validate complete dates
  if (formatted.length === 10) {
    const parsed = parse(formatted, "yyyy-MM-dd", new Date());

    if (
      isValid(parsed) &&
      format(parsed, "yyyy-MM-dd") === formatted
    ) {
      setCurrentMonth(parsed);
      onChange?.(parsed);
    }
  }
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
      <div className="relative">
        <FiCalendar
          className={`
            absolute left-3 top-1/2 -translate-y-1/2
            transition-all duration-300 pointer-events-none

            ${
              isError
                ? "text-red-500"
                : focused
                ? "scale-110"
                : "text-slate-400 dark:text-slate-500"
            }
          `}
          style={{
            color:
              !isError && focused
                ? accentColor
                : undefined,
          }}
        />

        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
          className={`
            w-full rounded-lg border bg-white dark:bg-slate-800
            py-2.5 pl-10 pr-3 text-sm outline-none
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
              absolute left-0 z-100 mt-2

              w-[320px]

              rounded-xl
              border border-slate-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              px-2 py-4

              shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            "
          >
            {/* HEADER */}
            <div className="mb-4 flex items-center gap-2">
              <AppCustomButton
                type="button"
                variant="ghost"
                className="h-9 w-9 shrink-0"
                onClick={() =>
                  setCurrentMonth((prev) => subMonths(prev, 1))
                }
              >
                <FiChevronLeft />
              </AppCustomButton>
              <div className="flex flex-1 gap-2">
          <div className="flex-1">
            <AppSelect
              placeholder="Month"
              className="text-xs p-0"
              value={monthOptions.find(
                (m) => m.value === currentMonth.getMonth()
              )}
              options={monthOptions}
              isSearchable={false}
              onChange={(option: any) => {
                if (!option) return;

                setCurrentMonth((prev) =>
                  setMonth(prev, option.value)
                );
              }}
              menuPortalTarget={document.body}
            />
          </div>

          <div className="">
            <AppSelect
              placeholder="Year"
              value={yearOptions.find(
                (y) => y.value === currentMonth.getFullYear()
              )}
              className="text-xs"
              options={yearOptions}
              isSearchable
              onChange={(option: any) => {
                if (!option) return;

                setCurrentMonth((prev) =>
                  setYear(prev, option.value)
                );
              }}
              menuPortalTarget={document.body}
            />
          </div>
        </div>
              <AppCustomButton
                type="button"
                variant="ghost"
                className="h-9 w-9 shrink-0"
                onClick={() =>
                  setCurrentMonth((prev) => addMonths(prev, 1))
                }
              >
                <FiChevronRight />
              </AppCustomButton>
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