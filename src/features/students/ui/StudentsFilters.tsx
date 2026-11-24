// src/features/students/ui/StudentsFilters.tsx
import { useEffect, useState } from "react";
import { useStudentsStore } from "../model/students.store";
import { STUDENT_STATUS, toOptions } from "../../../shared/constants/statuses";
import type { StudentStatus } from "../../../shared/constants/statuses";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const STATUS_OPTIONS = toOptions(STUDENT_STATUS);
// [{ value: "ACTIVE", label: "Активен" }, ...]

export function StudentsFilters() {
  const status = useStudentsStore((s) => s.status);
  const ordering = useStudentsStore((s) => s.ordering);
  const storeSearch = useStudentsStore((s) => s.search);

  const setSearch = useStudentsStore((s) => s.setSearch);
  const setStatus = useStudentsStore((s) => s.setStatus);
  const setOrdering = useStudentsStore((s) => s.setOrdering);

  // локальный инпут + debounce, чтобы не гонять fetch на каждый символ
  const [input, setInput] = useState(storeSearch);
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    if (debounced !== storeSearch) setSearch(debounced);
  }, [debounced, storeSearch, setSearch]);

  useEffect(() => {
    setInput(storeSearch);
  }, [storeSearch]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Поиск</span>
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          <option value="">Все статусы</option>
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
