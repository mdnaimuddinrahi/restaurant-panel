import Skeleton from "./Skeleton";

interface Props {
  collapsed: boolean;
}

export default function SkeletonSidebarFooter({
  collapsed,
}: Props) {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800 p-3">
      <div
        className={`
          flex items-center
          ${collapsed ? "justify-center" : "gap-3"}
        `}
      >
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />

        {!collapsed && (
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        )}
      </div>
    </div>
  );
}