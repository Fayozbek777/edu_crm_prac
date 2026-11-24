// src/features/students/ui/StudentsFilters.tsx
import { useStudentsStore } from "../model/students.store";
import type { StudentStatus } from "../../../shared/constants/statuses";

const STATUS_OPTIONS: { value: StudentStatus | ""; label: string }[] = [
  { value: "", label: "Все статусы" },
  { value: "active", label: "Активные" },
  { value: "inactive", label: "Неактивные" },
  { value: "graduated", label: "Выпускники" },
];

export function StudentsFilters() {
  const search = useStudentsStore((s) => s.search);
  const status = useStudentsStore((s) => s.status);
  const ordering = useStudentsStore((s) => s.ordering);

  const setSearch = useStudentsStore((s) => s.setSearch);
  const setStatus = useStudentsStore((s) => s.setStatus);
  const setOrdering = useStudentsStore((s) => s.setOrdering);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Поиск</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по ФИО, телефону, email…"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
          />
        </label>

        <select
          value={status ?? ""}
          onChange={(e) =>
            setStatus(
              (e.target.value || undefined) as StudentStatus | undefined,
            )
          }
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
        >
          <option value="-created_at">Новые сначала</option>
          <option value="created_at">Старые сначала</option>
          <option value="last_name">По фамилии</option>
          <option value="-last_name">По фамилии (обр.)</option>
        </select>
      </div>
    </div>
  );
}
