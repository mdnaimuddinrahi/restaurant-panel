interface SkeletonButtonProps {
  width?: "sm" | "md" | "lg" | "full";
  height?: "sm" | "md" | "lg";
  rounded?: boolean;
}

export default function SkeletonButton({
  width = "md",
  height = "md",
  rounded = true,
}: SkeletonButtonProps) {
  const widths = {
    sm: "w-24",
    md: "w-32",
    lg: "w-40",
    full: "w-full",
  };

  const heights = {
    sm: "h-9",
    md: "h-10",
    lg: "h-11",
  };

  return (
    <div
      className={`
        ${widths[width]}
        ${heights[height]}
        ${rounded ? "rounded-lg" : "rounded-md"}
        border border-slate-200 dark:border-slate-700
        bg-slate-100 dark:bg-slate-800
        animate-pulse
      `}
    />
  );
}