"use client";

import { useState } from "react";
import { useButtonTheme } from "@/hooks/useButtonTheme";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "danger";
};

export default function AppCustomButton({
  variant = "solid",
  className = "",
  ...props
}: Props) {
  const theme = useButtonTheme();

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <button
      {...props}
      // className={`${theme.classNames.base} ${className}`}
      // style={
      //   theme.styles[variant]({
      //     isHovered: hover,
      //     isActive: active,
      //   })
      // }
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
    />
  );
}