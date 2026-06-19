"use client";

import { useTheme } from "@/theme";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

export default function AppButton({
  children,
  onClick,
  loading = false,
  icon,
  iconPosition = "left",
  variant = "solid",
  className = "",
}: Props) {
  const { accentColor } = useTheme();
  const [pressed, setPressed] = useState(false);

  const baseStyle = `
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-lg text-sm font-medium
    transition-all duration-200
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants: any = {
    solid: {
      backgroundColor: accentColor,
      color: "#fff",
    },
    outline: {
      border: `1px solid ${accentColor}`,
      color: accentColor,
      backgroundColor: "transparent",
    },
    ghost: {
      color: accentColor,
      backgroundColor: "transparent",
    },
  };

  const Icon = loading ? (
    <FiLoader className="animate-spin" />
  ) : icon ? (
    <span
      className={`
        transition-transform duration-300
        ${pressed ? "scale-125" : "scale-100"}
      `}
    >
      {icon}
    </span>
  ) : null;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`${baseStyle} ${className}`}
      style={{
        ...variants[variant],
      }}
    >
      {iconPosition === "left" && Icon}
      {children}
      {iconPosition === "right" && Icon}
    </button>
  );
}