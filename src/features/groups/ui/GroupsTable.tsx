// src/features/groups/ui/GroupsTable.tsx
import type { Group } from "../types/groups.types";
import { GROUP_STATUS } from "../../../shared/constants/statuses";
import { useRemoveGroup } from "../model/groups.queries";

const PAGE_SIZE = 10;

interface Props {
  items: Group[];
  count: number;
  page: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onEdit: (g: Group) => void;
}

function StatusBadge({ status }: { status: Group["status"] }) {
  const color: Record<string, string> = {
    RECRUITING: "bg-amber-50 text-amber-700 ring-amber-200",
    ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    FINISHED: "bg-blue-50 text-blue-700 ring-blue-200",
    CANCELLED: "bg-gray-100 text-gray-600 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        color[status] ?? "bg-gray-100 text-gray-600 ring-gray-200"
      }`}
    >
      {GROUP_STATUS[status as keyof typeof GROUP_STATUS] ?? status ?? "—"}
    </span>
  );
}

export function GroupsTable({
  items,
  count,
  page,
  isFetching,
  onPageChange,
  onEdit,
}: Props) {
  const remove = useRemoveGroup();
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">Групп не найдено</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Название
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Курс
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Преподаватель
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Статус
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Студентов
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Старт
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Активна
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((g) => (
              <tr key={g.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{g.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {g.name || "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {g.course_name ?? g.course ?? "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {g.teacher_name ?? g.teacher ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={g.status} />
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {g.students_count != null
                    ? `${g.students_count}/${g.max_students}`
                    : (g.max_students ?? "—")}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {g.start_date
                    ? new Date(g.start_date).toLocaleDateString("ru-RU")
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  {g.is_active ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      Да
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                      Нет
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onEdit(g)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Удалить группу?")) remove.mutate(g.id);
                    }}
                    disabled={remove.isPending}
                    className="ml-2 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
        <span className="text-xs text-gray-500">
          Стр. {page} из {totalPages} · всего {count}
          {isFetching && <span className="ml-2">обновление…</span>}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
          >
            Назад
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
          >
            Вперёд
          </button>
        </div>
      </div>
    </div>
  );
}
