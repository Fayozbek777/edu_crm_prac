// src/features/courses/ui/CoursesFilters.tsx
import { useEffect, useState } from "react";
import { COURSE_LEVEL, toOptions } from "../../../shared/constants/statuses";
import type { CourseLevel } from "../../../shared/constants/statuses";
import type { CourseListParams } from "../types/courses.types";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const LEVEL_OPTIONS = toOptions(COURSE_LEVEL);
const ACTIVE_OPTIONS = [
  { value: "", label: "Все" },
  { value: "true", label: "Активные" },
  { value: "false", label: "Неактивные" },
];

interface Props {
  params: CourseListParams;
  onChange: (next: CourseListParams) => void;
}

export function CoursesFilters({ params, onChange }: Props) {
  const [input, setInput] = useState(params.search ?? "");
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    if ((params.search ?? "") === debounced) return;
    onChange({ ...params, search: debounced || undefined, page: 1 });
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Поиск по названию…"
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
      />

      <select
        value={params.level ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            level: (e.target.value || undefined) as CourseLevel | undefined,
            page: 1,
          })
        }
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
      >
        <option value="">Все уровни</option>
        {LEVEL_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        value={params.is_active === undefined ? "" : String(params.is_active)}
        onChange={(e) => {
          const v = e.target.value;
          onChange({
            ...params,
            is_active: v === "" ? undefined : v === "true",
            page: 1,
          });
        }}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
      >
        {ACTIVE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        value={params.ordering ?? "-created_at"}
        onChange={(e) =>
          onChange({ ...params, ordering: e.target.value, page: 1 })
        }
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
      >
        <option value="-created_at">Новые сначала</option>
        <option value="created_at">Старые сначала</option>
        <option value="title">По названию A→Z</option>
        <option value="-title">По названию Z→A</option>
        <option value="price">Дешевле</option>
        <option value="-price">Дороже</option>
      </select>
    </div>
  );
}
