interface Props {
  columns: number;
}

export default function SkeletonTableHeader({
  columns,
}: Props) {
  return (
    <thead>

      <tr className="bg-slate-50 dark:bg-slate-800">

        {/* Filter */}

        {/* <th className="w-16 px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse mx-auto"/>
        </th> */}

        {Array.from({ length: columns }).map((_, i) => (
          <th
            key={i}
            className="px-4 py-3"
          >
            <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"/>
          </th>
        ))}

        {/* <th className="w-24 px-4 py-3">
          <div className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"/>
        </th> */}

      </tr>

    </thead>
  );
}