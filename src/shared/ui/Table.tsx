import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
  width?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
};

export default function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className="px-4 py-3 font-medium"
                style={{ width: c.width }}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
            >
              {columns.map((c) => (
                <td key={String(c.key)} className="px-4 py-3 text-slate-700">
                  {c.render
                    ? c.render(row)
                    : String((row as any)[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
