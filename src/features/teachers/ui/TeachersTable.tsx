// src/features/teachers/ui/TeachersTable.tsx
import type { Teacher } from "../types/teachers.types";
import { formatPhone } from "../../../shared/lib/formatPhone";
import { formatEmail } from "../../../shared/lib/formatEmail";
import { useRemoveTeacher } from "../model/teacher.queries";

const PAGE_SIZE = 10;

interface Props {
  items: Teacher[];
  count: number;
  page: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onEdit: (t: Teacher) => void;
}

function RatingBadge({
  rating,
}: {
  rating: string | number | null | undefined;
}) {
  if (rating === null || rating === undefined || rating === "")
    return <span className="text-gray-400">—</span>;
  const n = typeof rating === "number" ? rating : Number(rating);
  if (Number.isNaN(n)) return <span className="text-gray-400">—</span>;
  const color =
    n >= 4.5
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : n >= 3
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : "bg-red-50 text-red-700 ring-red-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${color}`}
    >
      ★ {n.toFixed(1)}
    </span>
  );
}

export function TeachersTable({
  items,
  count,
  page,
  isFetching,
  onPageChange,
  onEdit,
}: Props) {
  const remove = useRemoveTeacher();
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (items.length === 0)
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">
          Преподавателей не найдено
        </p>
      </div>
    );

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
                Специализация
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Телефон
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Стаж
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Рейтинг
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Активен
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((t) => (
              <tr key={t.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{t.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {t.full_name || `${t.last_name} ${t.first_name}`}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {t.specialization || "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {formatPhone(t.phone)}
                </td>
                <td
                  className="px-4 py-3 text-gray-700 max-w-[220px] truncate"
                  title={t.email ?? ""}
                >
                  {formatEmail(t.email)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {t.experience_years ? `${t.experience_years} лет` : "—"}
                </td>
                <td className="px-4 py-3">
                  <RatingBadge rating={t.rating} />
                </td>
                <td className="px-4 py-3">
                  {t.is_active ? (
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
                    onClick={() => onEdit(t)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Удалить преподавателя?"))
                        remove.mutate(t.id);
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
