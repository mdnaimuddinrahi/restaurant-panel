"use client";

import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { useTheme } from "@/theme";
import { useEffect, useState } from "react";
import { RiMoonClearLine } from "react-icons/ri";

export default function NavbarThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  // useEffect(() => {
  //   console.log('darkMode', darkMode)
  //   const saved = localStorage.getItem("darkMode") === "true";
  //   toggleDarkMode(saved);
  // }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <AppCustomButton
      variant="ghost"
      onClick={toggleDarkMode}
      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      {darkMode ? (
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <RiMoonClearLine />
      )}
    </AppCustomButton>
  );
  // return (
  //   <AppCustomButton
  //     variant="ghost"
  //     onClick={() => setDarkMode(!darkMode)}
  //     className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" 
  //   >
  //     {darkMode ? (
  //         <svg id="sun-icon" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
  //       ) : (
  //         <RiMoonClearLine />
  //       )}
  //   </AppCustomButton>
  // );
}