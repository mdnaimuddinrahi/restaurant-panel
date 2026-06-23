import { TableColumn } from "@/store/commonInterface";

interface ColumnSelectorProps<T> {
  columns: TableColumn<T>[];
  setColumns: React.Dispatch<
    React.SetStateAction<TableColumn<T>[]>
  >;
}

export default function ColumnSelector<T>({
  columns,
  setColumns,
}: ColumnSelectorProps<T>) {

  const toggleColumn = (key: keyof T) => {
    setColumns(prev =>
      prev.map(column =>
        column.key === key
          ? {
              ...column,
              isVisible: !column.isVisible,
            }
          : column
      )
    );
  };

  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 w-48 z-50">

      {columns.map(column => (
        <label
          key={String(column.key)}
          className="flex items-center gap-2 py-1 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={column.isVisible}
            onChange={() => toggleColumn(column.key)}
          />

          {column.label}
        </label>
      ))}
    </div>
  );
}