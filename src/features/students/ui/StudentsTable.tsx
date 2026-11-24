// src/features/students/ui/StudentsTable.tsx
import type { Student } from "../types/students.types";
import { STUDENT_STATUS } from "../../../shared/constants/statuses";
import { formatPhone } from "../../../shared/lib/formatPhone";
import { formatEmail } from "../../../shared/lib/formatEmail";
import { useRemoveStudent } from "../model/students.queries";

const PAGE_SIZE = 10;

interface Props {
  items: Student[];
  count: number;
  page: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onEdit: (s: Student) => void;
}

function StatusBadge({ status }: { status: Student["status"] }) {
  const color: Record<string, string> = {
    ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    FROZEN: "bg-amber-50 text-amber-700 ring-amber-200",
    GRADUATED: "bg-blue-50 text-blue-700 ring-blue-200",
    LEFT: "bg-gray-100 text-gray-600 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        color[status] ?? "bg-gray-100 text-gray-600 ring-gray-200"
      }`}
    >
      {STUDENT_STATUS[status] ?? status ?? "—"}
    </span>
  );
}

export function StudentsTable({
  items,
  count,
  page,
  isFetching,
  onPageChange,
  onEdit,
}: Props) {
  const remove = useRemoveStudent();
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">
          Студентов не найдено
        </p>
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
                ФИО
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Телефон
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Статус
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Создан
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((s) => (
              <tr key={s.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{s.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {s.full_name || `${s.last_name} ${s.first_name}`}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {formatPhone(s.phone)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {formatEmail(s.email)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(s.created_at).toLocaleDateString("ru-RU")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onEdit(s)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Удалить студента?")) remove.mutate(s.id);
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
