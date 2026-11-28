import type { EnrollMent } from "../types/enrollments.types";
import { formatDate } from "../../../shared/lib/formatDate";
import { useRemoveEnrollment } from "../model/enrollmets.queries";

const PAGE_SIZE = 10;

interface Props {
  items: EnrollMent[];
  count: number;
  page: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onEdit: (e: EnrollMent) => void;
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        active
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-gray-100 text-gray-600 ring-gray-200"
      }`}
    >
      {active ? "Активна" : "Неактивна"}
    </span>
  );
}

export function EnrollmentsTable({
  items,
  count,
  page,
  isFetching,
  onPageChange,
  onEdit,
}: Props) {
  const remove = useRemoveEnrollment();
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">Записей не найдено</p>
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
                Студент
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Группа
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Записан
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Скидка
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Статус
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((e) => (
              <tr key={e.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{e.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {e.student_name}
                </td>
                <td className="px-4 py-3 text-gray-700">{e.group_name}</td>
                <td className="px-4 py-3 text-gray-500">
                  {formatDate(e.enrolled_at)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {Number(e.discount_percent).toFixed(0)}%
                </td>
                <td className="px-4 py-3">
                  <StatusBadge active={e.is_active} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onEdit(e)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Удалить запись?")) remove.mutate(e.id);
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
