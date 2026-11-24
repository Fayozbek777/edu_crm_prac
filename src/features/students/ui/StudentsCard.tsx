// src/features/students/ui/StudentsCard.tsx
import type { Student } from "../types/students.types";
import { useRemoveStudent } from "../model/students.queries";

export function StudentsCard({
  student,
  onEdit,
}: {
  student: Student;
  onEdit: (s: Student) => void;
}) {
  const remove = useRemoveStudent();

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {student.full_name || `${student.last_name} ${student.first_name}`}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {student.specialization ?? "Студент"} · ID {student.id}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(student)}
            className="text-xs font-medium text-gray-600 transition hover:text-gray-900"
          >
            Изменить
          </button>
          <button
            onClick={() => {
              if (confirm("Удалить студента?")) remove.mutate(student.id);
            }}
            disabled={remove.isPending}
            className="text-xs font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-gray-600">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Телефон</dt>
          <dd>{student.phone || "—"}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Email</dt>
          <dd className="truncate">{student.email || "—"}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Статус</dt>
          <dd>{student.status}</dd>
        </div>
      </dl>
    </article>
  );
}
