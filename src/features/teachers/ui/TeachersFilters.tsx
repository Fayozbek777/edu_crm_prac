// src/features/teachers/ui/TeachersFilters.tsx
import { useEffect, useState } from "react";
import { useTeachersStore } from "../model/teachers.store";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const ACTIVE_OPTIONS = [
  { value: "", label: "Все" },
  { value: "true", label: "Активные" },
  { value: "false", label: "Неактивные" },
];

export function TeachersFilters() {
  const is_active = useTeachersStore((s) => s.is_active);
  const ordering = useTeachersStore((s) => s.ordering);
  const storeSearch = useTeachersStore((s) => s.search);

  const setSearch = useTeachersStore((s) => s.setSearch);
  const setIsActive = useTeachersStore((s) => s.setIsActive);
  const setOrdering = useTeachersStore((s) => s.setOrdering);

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
        placeholder="Поиск по ФИО, телефону, email, специализации…"
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
      />

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
        <option value="last_name">По фамилии A→Z</option>
        <option value="-last_name">По фамилии Z→A</option>
        <option value="-rating">По рейтингу ↓</option>
        <option value="-experience_years">По стажу ↓</option>
      </select>
    </div>
  );
}
