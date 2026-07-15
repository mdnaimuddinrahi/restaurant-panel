import { useMemo, useState } from "react";
import { useTheme } from "@/theme";
import { TableColumn } from "@/store/commonInterface";
import AppInput from "../input/AppInput";
import AppCustomButton from "../button/AppCustomButton";
import { RxCross2 } from "react-icons/rx";
import { t } from "i18next";
import useNumberFormatter from "@/hooks/useNumberFormatter";
import AppCheckbox from "../input/AppCheckbox";

interface Props<T> {
  open: boolean;
  onClose: () => void;
  columns: TableColumn<T>[];
  setColumns: React.Dispatch<
    React.SetStateAction<TableColumn<T>[]>
  >;
}

export default function ColumnSelectorModal<T>({
  open,
  onClose,
  columns,
  setColumns,
}: Props<T>) {
  if (!open) return null;

  const { accentColor } = useTheme();
  const [search, setSearch] = useState("");

  // const originalColumns = useMemo(() => columns, []);

  const filtered = columns.filter(col =>
    col.label.toLowerCase().includes(search.toLowerCase())
  );

  const chunkArray = <T,>(arr: T[], size: number) => {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  };

  const groups = chunkArray(filtered, 5);

  const toggleColumn = (key: keyof T) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === key
          ? { ...col, isVisible: !col.isVisible }
          : col
      )
    );
  };

  const selectAll = () => {
    setColumns(prev =>
      prev.map(c => ({ ...c, isVisible: true }))
    );
  };

  const clearAll = () => {
    setColumns(prev =>
      prev.map(c => ({ ...c, isVisible: false }))
    );
  };


  const checkboxStyle = {
    accentColor: accentColor,
  };
  const formatNumber = useNumberFormatter();
  const visibleColumns = columns.filter(col => col.isVisible).length;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-gray-50 dark:bg-slate-800 rounded-2xl shadow-2xl mx-4 overflow-hidden animate-fadeIn"
      >
        <div className="px-6 py-4 border-b border-gray-300 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('common:manage_columns')}
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t("common:columnsVisible", {
                visible: formatNumber(visibleColumns),
                total: formatNumber(columns.length),
              })}
            </p>
          </div>

          <AppCustomButton
            onClick={onClose}
            variant="ghost"
            className="text-xl"
          >
            <RxCross2 className="stroke-current" />
          </AppCustomButton>
        </div>

        {/* Controls */}
        <div className="px-6 pt-4 space-y-3">

          {/* Search */}
          <div>
            <AppInput value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder={t('common:placeholder.search')} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">

            <AppCustomButton variant="outline" onClick={selectAll} className="text-xs">
              {t('common:select_all')}
            </AppCustomButton>

            <AppCustomButton
              variant="outline"
              onClick={clearAll}
              className="text-xs"
              >
              {t('common:clear_all')}
            </AppCustomButton>

          </div>

        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex gap-6">

            {groups.map((group, gi) => (
              <div key={gi} className="min-w-55">

                <div className="text-xs text-slate-500 mb-3">
                  {/* Columns {gi * 5 + 1} -{" "}
                  {gi * 5 + group.length} */}
                  {t("common:columnRange", {
                      from: formatNumber(gi * 5 + 1),
                      to: formatNumber(gi * 5 + group.length),
                    })}
                </div>

                <div className="space-y-2">
                  {group.map(col => (
                    <label
                      key={String(col.key)}
                      className="
                        flex items-center justify-between px-3
                        py-2 rounded-xl hover:bg-slate-200
                      dark:hover:bg-slate-700 cursor-pointer 
                        transition"
                    >
                      <span className="text-sm">
                        {t(col.label)}
                      </span>
                      <AppCheckbox
                        checked={col.isVisible}
                        onChange={() => toggleColumn(col.key)}
                      />
                    </label>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}