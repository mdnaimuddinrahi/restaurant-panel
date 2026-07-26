interface Props {
  columns: number;
}

export default function SkeletonTableRow({
  columns,
}: Props) {
  return (
    <tr className="border-t border-slate-100 dark:border-slate-800">

      {/* ID */}

      <td className="px-4 py-3">
        <div className="h-3 w-6 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"/>
      </td>

      {/* Other columns */}

      {Array.from({ length: columns - 2 }).map((_, i) => (
        <td
          key={i}
          className="px-4 py-3"
        >
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"/>
        </td>
      ))}

      {/* Action */}

      <td className="px-4 py-3">

        <div className="flex gap-2">

          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"/>

          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"/>

        </div>

      </td>

    </tr>
  );
}