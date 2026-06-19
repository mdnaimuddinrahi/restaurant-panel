import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

interface TableHeadProps {
  sortState: { col: string, dir: 'asc' | 'desc' }, 
  sortTable: (parameter: string) => void,
  columns: {
    key: string, 
    label: string, 
    isSort?: boolean
  }[];
}

export default function TableHead({sortState, sortTable, columns}: TableHeadProps) {
  
  return (
    <thead>
        <tr className="bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {columns.map((column) => (
          <th
            key={column.key}
            className={`px-4 py-3 text-left font-semibold ${
              column.isSort
                ? "cursor-pointer select-none"
                : ""
            }`}
            onClick={() =>
              column.isSort && sortTable(column.key)
            }
          >
            <div className="flex items-center gap-1">
              <span>{column.label}</span>

              {column.isSort && sortState.col === column.key && (
                sortState.dir === "asc"
                  ? <IoMdArrowRoundUp className="inline-block" />
                  : <IoMdArrowRoundDown className="inline-block" />
              )}
            </div>
          </th>
        ))}
          <th className="px-4 py-3 text-left font-semibold">Actions</th>
        </tr>
    </thead>
  )
}