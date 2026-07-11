export default function SkeletonSelect() {
  return (
    <div className="h-10.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
    </div>
  );
}