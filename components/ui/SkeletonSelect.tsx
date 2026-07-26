interface SkeletonSelectProps {
  showLabel?: boolean;
}

export default function SkeletonSelect({
  showLabel = false,
}: SkeletonSelectProps) {
  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
      )}

      <div className="flex items-center justify-between h-10 rounded-lg border border-slate-200 dark:border-slate-700 px-3">
        <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />

        <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    </div>
  );
}