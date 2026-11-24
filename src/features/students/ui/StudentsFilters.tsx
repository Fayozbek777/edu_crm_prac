// src/features/students/ui/StudentsFilters.tsx
import { useEffect, useState } from "react";
import { STUDENT_STATUS, toOptions } from "../../../shared/constants/statuses";
import type { StudentStatus } from "../../../shared/constants/statuses";
import type { StudentsListParams } from "../types/students.types";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const STATUS_OPTIONS = toOptions(STUDENT_STATUS);

interface Props {
  params: StudentsListParams;
  onChange: (next: StudentsListParams) => void;
}

export function StudentsFilters({ params, onChange }: Props) {
  const [input, setInput] = useState(params.search ?? "");
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    if ((params.search ?? "") === debounced) return;
    onChange({ ...params, search: debounced || undefined, page: 1 });
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

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
          value={params.status ?? ""}
          onChange={(e) =>
            onChange({
              ...params,
              status: (e.target.value || undefined) as
                | StudentStatus
                | undefined,
              page: 1,
            })
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
          value={params.ordering ?? "-created_at"}
          onChange={(e) =>
            onChange({ ...params, ordering: e.target.value, page: 1 })
          }
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
