// src/features/courses/ui/CoursesCard.tsx
import { COURSE_LEVEL } from "../../../shared/constants/statuses";
import type { Course } from "../types/courses.types";
import { useCoursesStore } from "../model/courses.store";

function formatPrice(raw: string | number | null | undefined): string {
  if (raw === null || raw === undefined || raw === "") return "—";
  const n = typeof raw === "number" ? raw : Number(raw);
  if (Number.isNaN(n)) return "—";
  return n.toLocaleString("ru-RU") + " сум";
}

export function CoursesCard({
  course,
  onEdit,
}: {
  course: Course;
  onEdit: (c: Course) => void;
}) {
  const remove = useCoursesStore((s) => s.remove);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {course.title || "—"}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {COURSE_LEVEL[course.level] ?? course.level} · ID {course.id}
          </p>
        </div>
        {course.is_active ? (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
            Активен
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
            Неактивен
          </span>
        )}
      </div>

      {course.description && (
        <p className="mt-2 line-clamp-2 text-xs text-gray-600">
          {course.description}
        </p>
      )}

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-gray-600">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Цена</dt>
          <dd className="font-medium text-gray-900">
            {formatPrice(course.price)}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Длительность</dt>
          <dd>
            {course.duration_months ? `${course.duration_months} мес.` : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Уроков</dt>
          <dd>{course.lessons_count ?? "—"}</dd>
        </div>
      </dl>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={() => onEdit(course)}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
        >
          Изменить
        </button>
        <button
          onClick={() => {
            if (confirm("Удалить курс?")) remove(course.id);
          }}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          Удалить
        </button>
      </div>
    </article>
  );
}
