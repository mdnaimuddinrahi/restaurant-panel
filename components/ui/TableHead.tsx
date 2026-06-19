import { SortState, TableColumn } from "@/store/commonInterface";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

interface TableHeadProps<T> {
  sortState: SortState<T>;
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>>>;
  columns: TableColumn<T>[];
}

export default function TableHead<T>({
  sortState,
  setSortState,
  columns,
}: TableHeadProps<T>) {

  const sortTable = (column: keyof T) => {
    setSortState(prev => {
      if (prev.col === column) {
        return { col: column, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      } else {
        return { col: column, dir: 'asc' };
      }
    });
  }

  return (
    <thead>
      <tr className="bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`px-4 py-3 text-left font-semibold ${
              column.isSort ? "cursor-pointer select-none" : ""
            }`}
            onClick={() => {
              if (column.isSort) {
                sortTable(column.key);
              }
            }}
          >
            <div className="flex items-center gap-1">
              <span>{column.label}</span>

              {column.isSort &&
                sortState.col === column.key &&
                (sortState.dir === "asc" ? (
                  <IoMdArrowRoundUp className="shrink-0" />
                ) : (
                  <IoMdArrowRoundDown className="shrink-0" />
                ))}
            </div>
          </th>
        ))}

        <th className="px-4 py-3 text-left font-semibold">
          Actions
        </th>
      </tr>
    </thead>
  );
}

// export default function TableHead({sortState, sortTable, columns}: TableHeadProps) {
  
//   return (
//     <thead>
//         <tr className="bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
//           {columns.map((column) => (
//           <th
//             key={column.key}
//             className={`px-4 py-3 text-left font-semibold ${
//               column.isSort
//                 ? "cursor-pointer select-none"
//                 : ""
//             }`}
//             onClick={() =>
//               column.isSort && sortTable(column.key)
//             }
//           >
//             <div className="flex items-center gap-1">
//               <span>{column.label}</span>

//               {column.isSort && sortState.col === column.key && (
//                 sortState.dir === "asc"
//                   ? <IoMdArrowRoundUp className="inline-block" />
//                   : <IoMdArrowRoundDown className="inline-block" />
//               )}
//             </div>
//           </th>
//         ))}
//           <th className="px-4 py-3 text-left font-semibold">Actions</th>
//         </tr>
//     </thead>
//   )
// }