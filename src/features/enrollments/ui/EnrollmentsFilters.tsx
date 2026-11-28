import { useEffect, useState } from "react";
import type {
  EnrollMentListParams,
  OptionItem,
} from "../types/enrollments.types";
import { useDebounce } from "../../../shared/hooks/useDebounce";

interface Props {
  params: EnrollMentListParams;
  groups?: OptionItem[];
  onChange: (next: EnrollMentListParams) => void;
}

export function EnrollmentsFilters({ params, groups = [], onChange }: Props) {
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
            placeholder="Поиск по студенту, группе…"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
          />
        </label>

        <select
          value={params.group ?? ""}
          onChange={(e) =>
            onChange({
              ...params,
              group: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition focus:border-[var(--color-primary)] focus:outline-none"
        >
          <option value="">Все группы</option>
          {groups.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>

        <select
          value={
            params.is_active === undefined
              ? ""
              : params.is_active
                ? "true"
                : "false"
          }
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
          <option value="">Все статусы</option>
          <option value="true">Активные</option>
          <option value="false">Неактивные</option>
        </select>
      </div>
    </div>
  );
}
