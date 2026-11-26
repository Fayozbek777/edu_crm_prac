// src/features/groups/ui/GroupsCard.tsx
import type { Group } from "../types/groups.types";
import { GROUP_STATUS } from "../../../shared/constants/statuses";
import { useRemoveGroup } from "../model/groups.queries";

export function GroupsCard({
  group,
  onEdit,
}: {
  group: Group;
  onEdit: (g: Group) => void;
}) {
  const remove = useRemoveGroup();

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {group.name || "—"}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {GROUP_STATUS[group.status as keyof typeof GROUP_STATUS] ??
              group.status}{" "}
            · ID {group.id}
          </p>
        </div>
        {group.is_active ? (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
            Активна
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
            Неактивна
          </span>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-gray-600">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Курс</dt>
          <dd>{group.course_name ?? group.course ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Преподаватель</dt>
          <dd className="truncate">
            {group.teacher_name ?? group.teacher ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Студентов</dt>
          <dd>
            {group.students_count != null
              ? `${group.students_count}/${group.max_students}`
              : (group.max_students ?? "—")}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Старт</dt>
          <dd>
            {group.start_date
              ? new Date(group.start_date).toLocaleDateString("ru-RU")
              : "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={() => onEdit(group)}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
        >
          Изменить
        </button>
        <button
          onClick={() => {
            if (confirm("Удалить группу?")) remove.mutate(group.id);
          }}
          disabled={remove.isPending}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          Удалить
        </button>
      </div>
    </article>
  );
}
