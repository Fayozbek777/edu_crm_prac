// src/features/students/ui/StudentsCard.tsx
import type { Student } from "../types/students.types";
import { useStudentsStore } from "../model/students.store";

export function StudentsCard({ student }: { student: Student }) {
  const remove = useStudentsStore((s) => s.remove);

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
        <button
          onClick={() => {
            if (confirm("Удалить студента?")) remove(student.id);
          }}
          className="text-xs font-medium text-red-600 transition hover:text-red-700"
        >
          Удалить
        </button>
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
