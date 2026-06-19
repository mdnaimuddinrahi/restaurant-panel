import React from "react";
import { TableColumn } from "../types/table";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

export default function TableBody<T extends { id: number }>({
  data,
  columns,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {data.map((row) => (
        <tr
          key={row.id}
          className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
        >
          {columns.map((column) => (
            <td key={String(column.key)} className="px-4 py-3">
              {column.render
                ? column.render(row)
                : String(row[column.key] ?? "")}
            </td>
          ))}
        </tr>
      ))}

      {data.length === 0 && (
        <tr>
          <td
            colSpan={columns.length}
            className="px-4 py-8 text-center text-slate-400 text-sm"
          >
            No data found
          </td>
        </tr>
      )}
    </tbody>
  );
}