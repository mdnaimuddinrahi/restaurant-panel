interface SkeletonInputProps {
  showLabel?: boolean;
}

export default function SkeletonInput({
  showLabel = false,
}: SkeletonInputProps) {
  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
      )}

      <div className="flex items-center h-10 rounded-lg border border-slate-200 dark:border-slate-700 px-3">
        <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />

        {/* Blinking cursor */}
        <div className="ml-1 h-4 w-0.5 bg-slate-300 dark:bg-slate-500 animate-pulse" />
      </div>
    </div>
  );
}