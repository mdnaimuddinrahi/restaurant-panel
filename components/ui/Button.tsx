import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        // Variants
        {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          secondary: "bg-gray-200 text-black hover:bg-gray-300",
          danger: "bg-red-600 text-white hover:bg-red-700",
          outline: "border border-gray-300 hover:bg-gray-100",
          ghost: "hover:bg-gray-100",
        }[variant],

        // Sizes
        {
          sm: "text-sm px-2 py-1",
          md: "text-sm px-4 py-2",
          lg: "text-base px-6 py-3",
        }[size],

        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}