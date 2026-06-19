"use client";

import { useTheme } from "@/theme";
import { hexToRgba } from "@/theme/colorUtils";

export function useSelectTheme() {
  const { accentColor } = useTheme();

  const styles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? accentColor : base.borderColor,
      boxShadow: state.isFocused
        ? `0 0 0 2px ${hexToRgba(accentColor, 0.25)}`
        : base.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? accentColor : base.borderColor,
      },
    }),

    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? accentColor
        : state.isFocused
        ? hexToRgba(accentColor, 0.12)
        : base.backgroundColor,

      color: state.isSelected ? "#fff" : base.color,
    }),
  };

  const classNames = {
    control: ({ isFocused }: any) =>
      `
      min-h-10 rounded-lg border px-3 text-xs
      bg-white dark:bg-slate-800
      border-slate-300 dark:border-slate-700
      ${isFocused ? "shadow-md" : ""}
    `,

    valueContainer: () => "py-1 text-xs",

    input: () => "!text-xs !text-slate-900 dark:!text-slate-100",

    singleValue: () => "text-xs text-slate-900 dark:text-slate-100",

    placeholder: () => "text-xs text-slate-400 dark:text-slate-500",

    menu: () =>
      `
      mt-1 rounded-lg border shadow-lg
      bg-white dark:bg-slate-800
      border-slate-200 dark:border-slate-700
      overflow-hidden z-50
      `,

    menuList: () => "p-1",

    option: ({ isFocused, isSelected }: any) =>
      `
      px-3 py-2 text-xs rounded-md cursor-pointer transition-colors
      ${
        isSelected
          ? "text-white"
          : isFocused
          ? "bg-slate-100 dark:bg-slate-700"
          : "text-slate-900 dark:text-slate-100"
      }
      `,

    clearIndicator: () =>
      "text-slate-400 hover:text-red-500 cursor-pointer",

    // dropdownIndicator: () =>
    //   "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer",
    // dropdownIndicator: () => "px-1 text-slate-400",
    dropdownIndicator: () => "px-1",

    // indicatorSeparator: () =>
    //   "bg-slate-300 dark:bg-slate-700",
    indicatorSeparator: () => "hidden",
  };

  return {
    styles,
    classNames,
  };
}