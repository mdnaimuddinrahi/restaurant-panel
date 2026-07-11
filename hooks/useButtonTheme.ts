"use client";

import { useTheme } from "@/theme";
import { hexToRgba } from "@/theme/colorUtils";

export function useButtonTheme() {
  const { accentColor } = useTheme();

  const styles = {
    solid: (state?: { isHovered?: boolean; isActive?: boolean }) => ({
      backgroundColor: state?.isActive
        ? hexToRgba(accentColor, 0.8)
        : state?.isHovered
        ? hexToRgba(accentColor, 0.9)
        : accentColor,
      color: "#fff",
      border: "1px solid transparent",
      transition: "all 0.15s ease",
    }),

    danger: (state?: { isHovered?: boolean; isActive?: boolean }) => ({
      backgroundColor: state?.isActive
        ? "#b91c1c" // red-700
        : state?.isHovered
        ? "#b91c1c" // red-600
        : "#ef4444", // red-500
      color: "#fff",
      border: "1px solid transparent",
      transition: "all 0.15s ease",
    }),

    outline: (state?: { isHovered?: boolean; isActive?: boolean }) => ({
      backgroundColor: state?.isActive
        ? hexToRgba(accentColor, 0.15)
        : state?.isHovered
        ? hexToRgba(accentColor, 0.08)
        : "transparent",
    //   color: accentColor,
      border: `1px solid ${accentColor}`,
      transition: "all 0.15s ease",
    }),

    ghost: (state?: { isHovered?: boolean; isActive?: boolean }) => ({
      backgroundColor: state?.isActive
        ? hexToRgba(accentColor, 0.2)
        : state?.isHovered
        ? hexToRgba(accentColor, 0.1)
        : 
        "transparent",
      border: "1px  transparent",
      transition: "all 0.15s ease",
    }),
  };

  const classNames = {
    base: (textSize = "text-xs") => `
      inline-flex items-center justify-center
      px-2 py-1 ${textSize} font-medium
      rounded-lg
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      select-none
      text-gray-600 dark:text-gray-300
    `,
  };

  return {
    styles,
    classNames,
    accentColor,
  };
}