// src/features/teachers/ui/TeachersFilters.tsx
import { useEffect, useState } from "react";
import type { TeacherListParams } from "../types/teachers.types";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const ACTIVE_OPTIONS = [
  { value: "", label: "Все" },
  { value: "true", label: "Активные" },
  { value: "false", label: "Неактивные" },
];

interface Props {
  params: TeacherListParams;
  onChange: (next: TeacherListParams) => void;
}

export function TeachersFilters({ params, onChange }: Props) {
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
        placeholder="Поиск по ФИО, телефону, email, специализации…"
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
      />

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
        <option value="last_name">По фамилии A→Z</option>
        <option value="-last_name">По фамилии Z→A</option>
        <option value="-rating">По рейтингу ↓</option>
        <option value="-experience_years">По стажу ↓</option>
      </select>
    </div>
  );
}
