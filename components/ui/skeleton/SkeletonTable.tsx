import SkeletonTableFooter from "./SkeletonTableFooter";
import SkeletonTableHeader from "./SkeletonTableHeader";
import SkeletonTableRow from "./SkeletonTableRow";
interface SkeletonTableProps {
  columns?: number;
  rows?: number;
  showFooter?: boolean;
}

export default function SkeletonTable({
  columns = 8,
  rows = 5,
  showFooter = true,
}: SkeletonTableProps) {
  return (
    <div className="overflow-hidden  border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table className="w-full text-sm">
            <SkeletonTableHeader columns={columns} />
            <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                <SkeletonTableRow
                    key={i}
                    columns={columns}
                />
                ))}
            </tbody>
        </table>
      {showFooter && <SkeletonTableFooter />}

    </div>
  );
}