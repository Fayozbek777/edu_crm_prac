// src/features/courses/ui/CoursesForm.tsx
import { useEffect, useState } from "react";
import { useCreateCourse, useUpdateCourse } from "../model/courses.queries";
import type { Course } from "../types/courses.types";
import { COURSE_LEVEL, toOptions } from "../../../shared/constants/statuses";
import type { CourseLevel } from "../../../shared/constants/statuses";

const LEVEL_OPTIONS = toOptions(COURSE_LEVEL);

interface Props {
  course?: Course;
  onClose: () => void;
}

const empty = {
  title: "",
  description: "",
  level: "BEGINNER" as CourseLevel,
  price: "",
  duration_months: 0,
  lessons_count: 0,
  is_active: true,
};

export function CoursesForm({ course, onClose }: Props) {
  const isEdit = Boolean(course);
  const createMutation = useCreateCourse(); // ✅
  const updateMutation = useUpdateCourse(); // ✅
  const saving = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState(empty);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title,
        description: course.description ?? "",
        level: course.level,
        price: String(course.price ?? ""),
        duration_months: course.duration_months ?? 0,
        lessons_count: course.lessons_count ?? 0,
        is_active: course.is_active,
      });
    } else {
      setForm(empty);
    }
  }, [course]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!form.title.trim()) {
      setErr("Введите название курса");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setErr("Введите корректную цену");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      level: form.level,
      price: form.price,
      duration_months: Number(form.duration_months) || 0,
      lessons_count: Number(form.lessons_count) || 0,
      is_active: form.is_active,
    };

    try {
      if (isEdit && course) {
        await updateMutation.mutateAsync({ id: course.id, data: payload }); // ✅
      } else {
        await createMutation.mutateAsync(payload); // ✅
      }
      onClose();
    } catch (e: any) {
      const details = e?.response?.data?.details;
      if (details && typeof details === "object") {
        const [field, msgs] = Object.entries(details)[0] ?? [];
        setErr(
          field
            ? `${field}: ${(msgs as string[]).join(", ")}`
            : "Ошибка валидации",
        );
      } else {
        setErr(e?.response?.data?.message ?? "Не удалось сохранить");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Редактировать курс" : "Новый курс"}
        </h2>

        {err && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Название" required full>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Уровень">
            <select
              value={form.level}
              onChange={(e) => set("level", e.target.value as CourseLevel)}
              className={inputCls}
            >
              {LEVEL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Цена (сум)" required>
            <input
              required
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Длительность (мес.)">
            <input
              type="number"
              min={0}
              value={form.duration_months}
              onChange={(e) =>
                set("duration_months", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>

          <Field label="Количество уроков">
            <input
              type="number"
              min={0}
              value={form.lessons_count}
              onChange={(e) =>
                set("lessons_count", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>

          <Field label="Описание" full>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Активен" full>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              Курс доступен для записи
            </label>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
          >
            {saving ? "Сохранение…" : isEdit ? "Сохранить" : "Создать"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none";

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="mb-1 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
