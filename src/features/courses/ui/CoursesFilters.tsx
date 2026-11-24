// src/features/courses/ui/CoursesFilters.tsx
import { useEffect, useState } from "react";
import { useCoursesStore } from "../model/courses.store";
import { COURSE_LEVEL, toOptions } from "../../../shared/constants/statuses";
import type { CourseLevel } from "../../../shared/constants/statuses";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const LEVEL_OPTIONS = toOptions(COURSE_LEVEL);
// [{ value: "BEGINNER", label: "Начальный" }, ...]

const ACTIVE_OPTIONS = [
  { value: "", label: "Все" },
  { value: "true", label: "Активные" },
  { value: "false", label: "Неактивные" },
];

export function CoursesFilters() {
  const level = useCoursesStore((s) => s.level);
  const is_active = useCoursesStore((s) => s.is_active);
  const ordering = useCoursesStore((s) => s.ordering);
  const storeSearch = useCoursesStore((s) => s.search);

  const setSearch = useCoursesStore((s) => s.setSearch);
  const setLevel = useCoursesStore((s) => s.setLevel);
  const setIsActive = useCoursesStore((s) => s.setIsActive);
  const setOrdering = useCoursesStore((s) => s.setOrdering);

  const [input, setInput] = useState(storeSearch);
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    if (debounced !== storeSearch) setSearch(debounced);
  }, [debounced, storeSearch, setSearch]);

  useEffect(() => {
    setInput(storeSearch);
  }, [storeSearch]);

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
        value={level ?? ""}
        onChange={(e) =>
          setLevel((e.target.value || undefined) as CourseLevel | undefined)
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
        value={is_active === undefined ? "" : String(is_active)}
        onChange={(e) => {
          const v = e.target.value;
          setIsActive(v === "" ? undefined : v === "true");
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
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
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
