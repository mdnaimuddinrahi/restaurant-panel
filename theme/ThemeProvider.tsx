"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  accentColor: string;
  setAccentColor: (color: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const [accentColor, setAccentColorState] = useState("#6366f1");
  const [darkMode, setDarkMode] = useState(false);

  // load saved values
  useEffect(() => {
    const savedAccent = localStorage.getItem("accentColor");
    const savedDark = localStorage.getItem("darkMode");

    if (savedAccent) setAccentColorState(savedAccent);
    if (savedDark) setDarkMode(savedDark === "true");
  }, []);

  // apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // sync accent color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      accentColor
    );
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  const toggleDarkMode = () => setDarkMode((p) => !p);

  return (
    <ThemeContext.Provider
      value={{ accentColor, setAccentColor, darkMode, toggleDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};