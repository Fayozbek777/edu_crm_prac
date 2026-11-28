import type { EnrollMent } from "../types/enrollments.types";
import { formatDate } from "../../../shared/lib/formatDate";
import { useRemoveEnrollment } from "../model/enrollmets.queries";

interface Props {
  enrollment: EnrollMent;
  onEdit: (e: EnrollMent) => void;
}

export function EnrollmentsCard({ enrollment, onEdit }: Props) {
  const remove = useRemoveEnrollment();

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {enrollment.student_name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {enrollment.group_name} · ID {enrollment.id}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(enrollment)}
            className="text-xs font-medium text-gray-600 transition hover:text-gray-900"
          >
            Изменить
          </button>
          <button
            onClick={() => {
              if (confirm("Удалить запись?")) remove.mutate(enrollment.id);
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
          <dt className="text-gray-400">Записан</dt>
          <dd>{formatDate(enrollment.enrolled_at)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Скидка</dt>
          <dd>{Number(enrollment.discount_percent).toFixed(0)}%</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-gray-400">Статус</dt>
          <dd>{enrollment.is_active ? "Активна" : "Неактивна"}</dd>
        </div>
      </dl>
    </article>
  );
}
