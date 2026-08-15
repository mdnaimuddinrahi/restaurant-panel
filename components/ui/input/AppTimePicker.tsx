"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiClock, FiChevronDown } from "react-icons/fi";
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

  /** Let the user type a time directly instead of only picking from the dropdown. Default: true. */
  typable?: boolean;
}

// Accepts "10:30:AM", "10:30 AM", "10:30AM" — colon, space, or nothing as separator.
const TYPED_TIME_PATTERN = /^(\d{1,2})\s*[:\s]?\s*([0-5]\d)\s*[:\s]?\s*(AM|PM)$/i;
const PANEL_HEIGHT = 264; // h-64 (256px) + margin

export default function AppTimePicker({
  value,
  onChange,
  label,
  placeholder = t("main:placeholder.select_time"),
  required,
  error,
  disabled,
  className,
  typable = true,
}: AppTimePickerProps) {
  const { accentColor } = useTheme();

  // Reading localStorage during render breaks SSR — moved into an effect
  // so it only runs on the client.
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(localStorage.getItem("darkMode") === "true");
  }, []);

  const isError = !!error;

  const wrapperRef = useRef<HTMLDivElement>(null); // label + trigger — outside-click zone #1
  const triggerRef = useRef<HTMLDivElement>(null); // just the input row — used to position the portal
  const panelRef = useRef<HTMLDivElement>(null); // the portaled dropdown — outside-click zone #2

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [inputText, setInputText] = useState(value || "");

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  useEffect(() => {
    if (!value) return;
    const parts = value.split(":");
    if (parts.length === 3) {
      setHour(parts[0]);
      setMinute(parts[1]);
      setPeriod(parts[2] as "AM" | "PM");
    }
    setInputText(value);
  }, [value]);

  // Outside-click has to check the trigger AND the portaled panel,
  // since the panel is no longer a DOM child of wrapperRef.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = wrapperRef.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setOpen(false);
    };
    window.addEventListener("mousedown", click);
    return () => window.removeEventListener("mousedown", click);
  }, []);

  // Re-centers the highlighted hour/minute/period whenever the panel opens
  // OR a new value is committed (e.g. via typing + Enter) while it's open.
  useEffect(() => {
    if (!open) return;
    const scrollToSelected = (container: HTMLDivElement | null) => {
      if (!container) return;
      const el = container.querySelector<HTMLElement>('[data-selected="true"]');
      el?.scrollIntoView({ block: "center" });
    };
    const id = requestAnimationFrame(() => {
      scrollToSelected(hourRef.current);
      scrollToSelected(minuteRef.current);
      scrollToSelected(periodRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [open, hour, minute, period]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Positions the portaled panel from the trigger's real screen coords.
  // Recomputed on open, and on scroll/resize (capture:true so it also catches
  // scrolling inside a modal body, not just the window).
  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldFlip = spaceBelow < PANEL_HEIGHT && rect.top > PANEL_HEIGHT;

    setPosition({
      top: shouldFlip ? rect.top - PANEL_HEIGHT : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  const emitValue = (h: string, m: string, p: "AM" | "PM") => {
    const time = `${h}:${m}:${p}` as TimeValue;
    onChange?.(time);
    setInputText(time);
  };

  const commitTypedValue = () => {
    const match = inputText.trim().match(TYPED_TIME_PATTERN);
    if (!match) {
      setInputText(value || ""); // invalid — revert to last confirmed value
      return;
    }
    const [, rawHour, rawMinute, rawPeriod] = match;
    const hourNum = parseInt(rawHour, 10);
    if (hourNum < 1 || hourNum > 12) {
      setInputText(value || ""); // reject out-of-range hour rather than silently clamping it
      return;
    }
    const h = String(hourNum).padStart(2, "0");
    const p = rawPeriod.toUpperCase() as "AM" | "PM";
    setHour(h);
    setMinute(rawMinute);
    setPeriod(p);
    emitValue(h, rawMinute, p);
  };

  const panelAnimation = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } },
  };

  const idleBorder = isDark ? "#334155" : "#CBD5E1";

  return (
    <div className={`relative w-full ${className || ""}`} ref={wrapperRef}>
      {label && (
        <label
          className={`mb-1.5 block text-xs font-medium transition-colors duration-300 ${
            isError ? "text-red-500" : "text-slate-500 dark:text-slate-200"
          }`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        ref={triggerRef}
        className={`w-full h-11 rounded-lg border px-3 flex items-center justify-between transition-all duration-200 ${
          disabled ? "opacity-60" : ""
        }`}
        style={{
          borderColor: isError ? "#ef4444" : open ? accentColor : idleBorder,
          boxShadow: open
            ? isError
              ? "0 0 0 4px rgb(239 68 68 / .10)"
              : `0 0 0 4px ${accentColor}20`
            : "none",
        }}
        onMouseEnter={(e) => {
          if (!open && !isError) e.currentTarget.style.borderColor = accentColor;
        }}
        onMouseLeave={(e) => {
          if (!open && !isError) e.currentTarget.style.borderColor = idleBorder;
        }}
      >
        <div className="flex flex-1 min-w-0 items-center gap-2">
          <FiClock size={16} color={isError ? "#ef4444" : open ? accentColor : idleBorder} />

          {typable ? (
            <input
              type="text"
              disabled={disabled}
              value={inputText}
              placeholder={placeholder}
              onFocus={() => setOpen(true)}
              onChange={(e) => setInputText(e.target.value)}
              onBlur={commitTypedValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitTypedValue();
                }
                if (e.key === "Escape") setInputText(value || "");
              }}
              className={`w-full bg-transparent text-sm outline-none ${
                isError
                  ? "text-red-500 placeholder:text-red-300"
                  : isDark
                  ? "text-slate-100 placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setOpen((v) => !v)}
              className={`w-full text-left text-sm ${
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
            </button>
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0"
          aria-label="Toggle time picker"
        >
          <FiChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                variants={panelAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ position: "fixed", top: position.top, left: position.left, width: position.width }}
                className="z-9999 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-gray-800"
              >
                <div className="flex h-64">
                  {/* Hour */}
                  <div ref={hourRef} className="flex-1 overflow-y-auto border-r border-slate-200 p-2 dark:border-slate-700">
                    {hours.map((h) => (
                      <button
                        key={h}
                        type="button"
                        data-selected={hour === h}
                        onClick={() => {
                          setHour(h);
                          emitValue(h, minute, period);
                        }}
                        className={`mb-1 w-full rounded-lg py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                          hour === h ? "text-white" : ""
                        }`}
                        style={{ background: hour === h ? accentColor : "transparent" }}
                        onMouseEnter={(e) => {
                          if (hour !== h) e.currentTarget.style.background = `${accentColor}20`;
                        }}
                        onMouseLeave={(e) => {
                          if (hour !== h) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>

                  {/* Minute */}
                  <div ref={minuteRef} className="flex-1 overflow-y-auto border-r border-slate-200 p-2 dark:border-slate-700">
                    {minutes.map((m) => (
                      <button
                        key={m}
                        type="button"
                        data-selected={minute === m}
                        onClick={() => {
                          setMinute(m);
                          emitValue(hour, m, period);
                        }}
                        className={`mb-1 w-full rounded-lg py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                          minute === m ? "text-white" : ""
                        }`}
                        style={{ background: minute === m ? accentColor : "transparent" }}
                        onMouseEnter={(e) => {
                          if (minute !== m) e.currentTarget.style.background = `${accentColor}20`;
                        }}
                        onMouseLeave={(e) => {
                          if (minute !== m) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {/* AM / PM */}
                  <div ref={periodRef} className="w-24 overflow-y-auto p-2">
                    {(["AM", "PM"] as const).map((item) => (
                      <button
                        key={item}
                        type="button"
                        data-selected={period === item}
                        onClick={() => {
                          setPeriod(item);
                          emitValue(hour, minute, item);
                          setOpen(false);
                        }}
                        className={`mb-2 w-full rounded-lg py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                          period === item ? "text-white" : ""
                        }`}
                        style={{ background: period === item ? accentColor : "transparent" }}
                        onMouseEnter={(e) => {
                          if (period !== item) e.currentTarget.style.background = `${accentColor}20`;
                        }}
                        onMouseLeave={(e) => {
                          if (period !== item) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
