export default function SkeletonTableFooter() {
  return (
    <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">

      {/* Left */}

      <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"/>

      {/* Page Size */}

      <div className="h-10 w-32 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 animate-pulse"/>

      {/* Pagination */}

      <div className="flex gap-2">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"
          />
        ))}

      </div>

    </div>
  );
}