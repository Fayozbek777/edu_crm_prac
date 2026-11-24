// src/features/students/ui/StudentsTable.tsx
import { useStudentsStore } from "../model/students.store";
import type { Student } from "../types/students.types";

const PAGE_SIZE = 10;

function StatusBadge({ status }: { status: Student["status"] }) {
  const map: Record<Student["status"], string> = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    inactive: "bg-gray-100 text-gray-600 ring-gray-200",
    graduated: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  const label: Record<Student["status"], string> = {
    active: "Активен",
    inactive: "Неактивен",
    graduated: "Выпускник",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

export function StudentsTable() {
  const items = useStudentsStore((s) => s.items);
  const count = useStudentsStore((s) => s.count);
  const loading = useStudentsStore((s) => s.loading);
  const error = useStudentsStore((s) => s.error);
  const page = useStudentsStore((s) => s.page);
  const setPage = useStudentsStore((s) => s.setPage);
  const remove = useStudentsStore((s) => s.remove);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (loading && items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Загрузка…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">
          Студентов не найдено
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Попробуйте изменить фильтры или добавьте нового студента.
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
                <td className="px-4 py-3 text-gray-700">{s.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-700">{s.email || "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(s.created_at).toLocaleDateString("ru-RU")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      if (confirm("Удалить студента?")) remove(s.id);
                    }}
                    className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
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
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Назад
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Вперёд
          </button>
        </div>
      </div>
    </div>
  );
}
