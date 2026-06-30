"use client";

import { useTheme } from "@/theme";
import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { useEffect, useRef, useState } from "react";

export default function NavbarColorPicker() {
  const { accentColor, setAccentColor } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const accentColors = [
    "#4F46E5", // Indigo
    "#3B82F6", // Azure
    "#06B6D4", // Sky Cyan
    "#14B8A6", // Aqua
    "#10B981", // Emerald
    "#84CC16", // Lime
    "#F59E0B", // Amber
    "#F97316", // Orange
    "#EF4444", // Coral Red
    "#EC4899", // Pink
    "#8B5CF6", // Violet
    "#64748B", // Cool Slate
  ];

  useEffect(() => {
    const saved = localStorage.getItem("accentColor") || "#6366f1";
    applyAccent(saved);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function applyAccent(color: string) {
    setAccentColor(color);
    localStorage.setItem("accentColor", color);

    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-light", color + "cc");
    document.documentElement.style.setProperty("--accent-dark", color);

    const hex = color.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    document.documentElement.style.setProperty(
      "--accent-subtle",
      `rgba(${r}, ${g}, ${b}, 0.1)`
    );

    document.documentElement.style.setProperty(
      "--accent-subtle-dark",
      `rgba(${r}, ${g}, ${b}, 0.2)`
    );

    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <AppCustomButton
        variant="ghost"
        className="w-8 h-8"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </AppCustomButton>

      <div
        className={`absolute right-0 top-11 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-3 z-50 origin-top-right transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <p className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Accent Color
        </p>

        <div className="grid grid-cols-4 gap-2">
          {accentColors.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => applyAccent(color)}
              className={`h-7 w-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                accentColor === color
                  ? "border-slate-900 dark:border-white ring-2 ring-offset-2 ring-slate-300 dark:ring-slate-600"
                  : "border-transparent"
              }`}
              style={{
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}