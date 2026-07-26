import Skeleton from "./Skeleton";

interface Props {
  collapsed: boolean;
}

export default function SkeletonNavRow({
  collapsed,
}: Props) {
  return (
    <div
      className={`
        h-11
        rounded-lg
        px-3
        flex items-center
        ${collapsed ? "justify-center" : "gap-3"}
      `}
    >
      <Skeleton className="w-5 h-5 rounded-sm shrink-0" />

      {!collapsed && (
        <>
          <Skeleton className="h-3 flex-1" />
        </>
      )}
    </div>
  );
}