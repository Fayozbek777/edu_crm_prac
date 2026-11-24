// src/features/courses/ui/CoursesTable.tsx
import { COURSE_LEVEL } from "../../../shared/constants/statuses";
import type { Course } from "../types/courses.types";
import { useRemoveCourse } from "../model/courses.queries";

const PAGE_SIZE = 10;

interface Props {
  items: Course[];
  count: number;
  page: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onEdit: (c: Course) => void;
}

function LevelBadge({ level }: { level: Course["level"] }) {
  const color: Record<string, string> = {
    BEGINNER: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    INTERMEDIATE: "bg-amber-50 text-amber-700 ring-amber-200",
    ADVANCED: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${color[level] ?? "bg-gray-100 text-gray-600 ring-gray-200"}`}
    >
      {COURSE_LEVEL[level] ?? level}
    </span>
  );
}

function formatPrice(raw: string | number | null | undefined): string {
  if (raw === null || raw === undefined || raw === "") return "—";
  const n = typeof raw === "number" ? raw : Number(raw);
  if (Number.isNaN(n)) return "—";
  return n.toLocaleString("ru-RU") + " сум";
}

export function CoursesTable({
  items,
  count,
  page,
  isFetching,
  onPageChange,
  onEdit,
}: Props) {
  const remove = useRemoveCourse();
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (items.length === 0)
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">Курсов не найдено</p>
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
                Название
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Уровень
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Цена
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Длит.
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Уроков
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Активен
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((c) => (
              <tr key={c.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{c.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {c.title || "—"}
                </td>
                <td className="px-4 py-3">
                  <LevelBadge level={c.level} />
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {formatPrice(c.price)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {c.duration_months ? `${c.duration_months} мес.` : "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {c.lessons_count ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {c.is_active ? (
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
                    onClick={() => onEdit(c)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Удалить курс?")) remove.mutate(c.id);
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
