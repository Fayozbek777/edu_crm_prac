import { useEffect, useState } from "react";
import type { GroupListParams } from "../types/groups.types";
import { GROUP_STATUS, toOptions } from "../../../shared/constants/statuses";
import type { GroupStatus } from "../../../shared/constants/statuses";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const STATUS_OPTIONS = toOptions(GROUP_STATUS);

interface Props {
  params: GroupListParams;
  onChange: (next: GroupListParams) => void;
}

export function GroupsFilters({ params, onChange }: Props) {
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
        placeholder="Поиск по названию группы…"
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
      />

      <select
        value={params.status ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            status: (e.target.value || undefined) as GroupStatus | undefined,
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
        <option value="name">По названию A→Z</option>
        <option value="-name">По названию Z→A</option>
      </select>
    </div>
  );
}
