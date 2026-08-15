
"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import { useTheme } from "@/theme";
import { t } from "i18next";

export type TimeValue = `${string}:${string}:AM` | `${string}:${string}:PM`;

export interface AppTimePickerProps {
  value?: TimeValue | "";
  onChange?: (value: TimeValue) => void;

  label?: string;
  placeholder?: string;

  required?: boolean;
  error?: string;

  disabled?: boolean;
  className?: string;
}


export default function AppTimePicker({
  value,
  onChange,
  label,
  placeholder = t("main:placeholder.select_time"),
  required,
  error,
  disabled,
  className,
}: AppTimePickerProps) {
  const { accentColor } = useTheme();

  // const isDark = false; // update later

  const darkMode = localStorage.getItem('darkMode'); // update later
  // console.log('isDark', isDark)
  const isDark = darkMode == "true" ? true : false
  const isError = !!error;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const hours = Array.from(
    { length: 12 },
    (_, i) => String(i + 1).padStart(2, "0")
  );

  const minutes = Array.from(
    { length: 60 },
    (_, i) => String(i).padStart(2, "0")
  );

  useEffect(() => {
    if (!value) return;

    const parts = value.split(":");

    if (parts.length === 3) {
      setHour(parts[0]);
      setMinute(parts[1]);
      setPeriod(parts[2] as "AM" | "PM");
    }
  }, [value]);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", click);

    return () =>
      window.removeEventListener("mousedown", click);
  }, []);

  // NEW: like react-select, scroll the active option into view whenever
  // the panel opens (instead of leaving the list wherever it last was)
  useEffect(() => {
    if (!open) return;

    const scrollToSelected = (
      container: HTMLDivElement | null
    ) => {
      if (!container) return;
      const el = container.querySelector<HTMLElement>(
        '[data-selected="true"]'
      );
      el?.scrollIntoView({ block: "center" });
    };

    // wait a tick so the panel has mounted/rendered before measuring
    const id = requestAnimationFrame(() => {
      scrollToSelected(hourRef.current);
      scrollToSelected(minuteRef.current);
      scrollToSelected(periodRef.current);
    });

    return () => cancelAnimationFrame(id);
  }, [open]);

  // NEW: also close on Escape, matching standard select dropdown behavior
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const emitValue = (
    h: string,
    m: string,
    p: "AM" | "PM"
  ) => {
    const time = `${h}:${m}:${p}` as TimeValue;
    onChange?.(time);
  };

  const panelAnimation = {
    hidden: {
      opacity: 0,
      y: -8,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.18,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <div
      className={`relative w-full ${className || ""}`}
      ref={wrapperRef}
    >
      {label && (
        <label
          className={`mb-1.5 block text-xs font-medium transition-colors duration-300 ${
            isError
              ? "text-red-500"
              : "text-slate-500 dark:text-slate-200"
          }`}
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`
          w-full
          h-11
          rounded-lg
          border
          px-3
          flex
          items-center
          justify-between
          transition-all
          duration-200
          disabled:opacity-60
          dark:text-slate-100
        `}
        style={{
          // background: isDark ? "#1e293b" : "#fff",

            borderColor: isError
              ? "#ef4444"
              : open
              ? accentColor
              : isDark
              ? "#334155"
              : "#CBD5E1",

          boxShadow: open
            ? isError
              ? "0 0 0 4px rgb(239 68 68 / .10)"
              : `0 0 0 4px ${accentColor}20`
            : "none",
        }}
        onMouseEnter={(e) => {
          if (!open && !isError) {
            e.currentTarget.style.borderColor =
              accentColor;
          }
        }}
        onMouseLeave={(e) => {
          if (!open && !isError) {
            e.currentTarget.style.borderColor = isDark
              ? "#334155"
              : "#CBD5E1";
          }
        }}
      >
        <div className="flex items-center gap-2">
          <FiClock
            size={16}
            color={
              isError
                ? "#ef4444"
                : open
                ? accentColor
                : isDark
                ? "#334155"
                : "#CBD5E1"
            }
          />

          <span
            className={`text-sm ${
              isError
                ? "text-red-500"
                : value
                ? isDark
                  ? "text-slate-100"
                  : "text-slate-900"
                : isDark
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            {value || placeholder}
          </span>
        </div>

        <FiChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute
              left-0
              top-full
              z-50
              mt-1
              w-full
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-gray-800
              shadow-xl
            "
          >
            <div className="flex h-64">
              {/* Hour */}
              <div
                ref={hourRef}
                className="flex-1 overflow-y-auto border-r border-slate-200 dark:border-slate-700 p-2"
              >
                {hours.map((h) => (
                  <button
                    key={h}
                    type="button"
                    data-selected={hour === h}
                    onClick={() => {
                      setHour(h);
                      emitValue(h, minute, period);
                    }}
                    className={`
                      mb-1 w-full rounded-lg py-2 
                      text-sm font-medium transition-all 
                      duration-200 active:scale-95  ${hour === h ? "text-white" : ""}`}
                    style={{
                      background:
                        hour === h
                          ? accentColor
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (hour !== h) {
                        e.currentTarget.style.background =
                          `${accentColor}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (hour !== h) {
                        e.currentTarget.style.background =
                          "transparent";
                      }
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* Minute */}
              <div
                ref={minuteRef}
                className="flex-1 overflow-y-auto border-r border-slate-200 dark:border-slate-700 p-2"
              >
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-selected={minute === m}
                    onClick={() => {
                      setMinute(m);
                      emitValue(hour, m, period);
                    }}
                    className={`
                      mb-1 w-full rounded-lg py-2
                      text-sm font-medium transition-all
                      duration-200 active:scale-95
                      ${minute === m ? "text-white" : ""}
                    `}
                    style={{
                      background:
                        minute === m
                          ? accentColor
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (minute !== m) {
                        e.currentTarget.style.background =
                          `${accentColor}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (minute !== m) {
                        e.currentTarget.style.background =
                          "transparent";
                      }
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* AM / PM */}
              <div
                ref={periodRef}
                className="w-24 overflow-y-auto p-2"
              >
                {(["AM", "PM"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-selected={period === item}
                    onClick={() => {
                      setPeriod(item);
                      emitValue(hour, minute, item);
                      // NEW: like a select, finishing the pick closes the dropdown
                      setOpen(false);
                    }}
                    className={`
                      mb-2 w-full rounded-lg py-2 
                      text-sm font-semibold transition-all 
                      duration-200 active:scale-95  ${period === item ? "text-white" : ""}`}
                    style={{
                      background:
                        period === item
                          ? accentColor
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (period !== item) {
                        e.currentTarget.style.background =
                          `${accentColor}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (period !== item) {
                        e.currentTarget.style.background =
                          "transparent";
                      }
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
