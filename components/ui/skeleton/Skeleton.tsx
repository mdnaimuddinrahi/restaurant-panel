interface SkeletonProps {
  className?: string;
}

export default function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-md
        bg-slate-200 dark:bg-slate-700
        ${className}
      `}
    >
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.5s_infinite]
          bg-linear-to-r
          from-transparent
          via-white/60
          dark:via-white/10
          to-transparent
        "
      />
    </div>
  );
}