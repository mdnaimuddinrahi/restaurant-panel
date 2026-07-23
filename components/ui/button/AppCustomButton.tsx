"use client";

import { useState } from "react";
import { useButtonTheme } from "@/hooks/useButtonTheme";
import { BiLoaderCircle } from "react-icons/bi";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "danger";
  loading?: boolean;
  loadingText?: string;
};

export default function AppCustomButton({
  variant = "solid",
  className = "",
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: Props) {
  const theme = useButtonTheme();

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        ${theme.classNames.base}
        
        transition-transform duration-150 ease-out
        active:scale-95
        ${className}
      `}
      style={theme.styles[variant]({
        isHovered: hover,
        isActive: active,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
    {loading ? (
        <span className="flex items-center justify-center gap-2">
          <BiLoaderCircle className="h-4 w-4 animate-spin" />
          {loadingText ?? "Loading..."}
        </span>
      ) : (
        children
      )}
    </button>
  );
}