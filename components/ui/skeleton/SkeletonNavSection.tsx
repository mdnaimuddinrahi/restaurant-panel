import SkeletonNavRow from "./SkeletonNavRow";
import Skeleton from "./Skeleton";

interface Props {
  collapsed: boolean;
  items: number;
}

export default function SkeletonNavSection({
  collapsed,
  items,
}: Props) {
  return (
    <div className="mb-4">

      {!collapsed && (
        <Skeleton className="h-3 w-20 ml-2 mb-3" />
      )}

      {collapsed && (
        <div className="h-px bg-slate-200 dark:bg-slate-700 mb-3" />
      )}

      <div className="space-y-1">
        {Array.from({ length: items }).map((_, i) => (
          <SkeletonNavRow
            key={i}
            collapsed={collapsed}
          />
        ))}
      </div>

    </div>
  );
}