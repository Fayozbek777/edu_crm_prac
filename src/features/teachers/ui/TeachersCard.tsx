// src/features/teachers/ui/TeachersCard.tsx
import type { Teacher } from "../types/teachers.types";
import { useTeachersStore } from "../model/teachers.store";
import { formatPhone } from "../../../shared/lib/formatPhone";
import { formatEmail } from "../../../shared/lib/formatEmail";

function ratingText(rating: string | number | null | undefined): string {
  if (rating === null || rating === undefined || rating === "") return "—";
  const n = typeof rating === "number" ? rating : Number(rating);
  return Number.isNaN(n) ? "—" : `★ ${n.toFixed(1)}`;
}

export function TeachersCard({
  teacher,
  onEdit,
}: {
  teacher: Teacher;
  onEdit: (t: Teacher) => void;
}) {
  const remove = useTeachersStore((s) => s.remove);
  const fullName =
    teacher.full_name || `${teacher.last_name} ${teacher.first_name}`;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-base font-semibold text-white">
          {teacher.photo ? (
            <img
              src={teacher.photo}
              alt={fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            (teacher.first_name?.[0] ?? "?").toUpperCase()
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {fullName}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {teacher.specialization || "—"} · ID {teacher.id}
          </p>
        </div>
        {teacher.is_active ? (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
            Активен
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
            Неактивен
          </span>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-gray-600">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Телефон</dt>
          <dd>{formatPhone(teacher.phone)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Email</dt>
          <dd className="truncate">{formatEmail(teacher.email)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Стаж</dt>
          <dd>
            {teacher.experience_years ? `${teacher.experience_years} лет` : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Рейтинг</dt>
          <dd>{ratingText(teacher.rating)}</dd>
        </div>
      </dl>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={() => onEdit(teacher)}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
        >
          Изменить
        </button>
        <button
          onClick={() => {
            if (confirm("Удалить преподавателя?")) remove(teacher.id);
          }}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          Удалить
        </button>
      </div>
    </article>
  );
}
