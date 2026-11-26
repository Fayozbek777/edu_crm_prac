// src/features/groups/ui/GroupsForm.tsx
import { useEffect, useState } from "react";
import type { Group } from "../types/groups.types";
import { GROUP_STATUS, toOptions } from "../../../shared/constants/statuses";
import type { GroupStatus } from "../../../shared/constants/statuses";
import { useCreateGroup, useUpdateGroup } from "../model/groups.queries";

const STATUS_OPTIONS = toOptions(GROUP_STATUS);

interface Props {
  group?: Group;
  onClose: () => void;
}

const empty = {
  name: "",
  course: "" as number | "",
  teacher: "" as number | "",
  status: "RECRUITING" as GroupStatus,
  start_date: "",
  end_date: "",
  schedule: "",
  max_students: 15,
  is_active: true,
};

export function GroupsForm({ group, onClose }: Props) {
  const isEdit = Boolean(group);
  const createMutation = useCreateGroup();
  const updateMutation = useUpdateGroup();
  const saving = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState(empty);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (group) {
      setForm({
        name: group.name,
        course: group.course,
        teacher: group.teacher ?? "",
        status: group.status as GroupStatus,
        start_date: group.start_date ?? "",
        end_date: group.end_date ?? "",
        schedule: group.schedule ?? "",
        max_students: group.max_students ?? 15,
        is_active: group.is_active,
      });
    } else {
      setForm(empty);
    }
  }, [group]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!form.name.trim()) {
      setErr("Введите название группы");
      return;
    }
    if (!form.course) {
      setErr("Выберите курс");
      return;
    }
    if (!form.max_students || Number(form.max_students) <= 0) {
      setErr("Введите корректное количество студентов");
      return;
    }

    const payload = {
      name: form.name.trim(),
      course: Number(form.course),
      teacher: form.teacher ? Number(form.teacher) : null,
      status: form.status,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      schedule: form.schedule.trim() || null,
      max_students: Number(form.max_students),
      is_active: form.is_active,
    };

    try {
      if (isEdit && group) {
        await updateMutation.mutateAsync({ id: group.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
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
          {isEdit ? "Редактировать группу" : "Новая группа"}
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
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="ID курса" required>
            <input
              required
              type="number"
              min={1}
              value={form.course}
              onChange={(e) =>
                set("course", e.target.value ? Number(e.target.value) : "")
              }
              className={inputCls}
            />
          </Field>

          <Field label="ID преподавателя">
            <input
              type="number"
              min={1}
              value={form.teacher}
              onChange={(e) =>
                set("teacher", e.target.value ? Number(e.target.value) : "")
              }
              className={inputCls}
            />
          </Field>

          <Field label="Статус">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as GroupStatus)}
              className={inputCls}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Макс. студентов">
            <input
              type="number"
              min={1}
              value={form.max_students}
              onChange={(e) => set("max_students", Number(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>

          <Field label="Дата старта">
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => set("start_date", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Дата окончания">
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => set("end_date", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Расписание" full>
            <input
              value={form.schedule}
              onChange={(e) => set("schedule", e.target.value)}
              placeholder="Например: Пн/Ср/Пт 18:00–19:30"
              className={inputCls}
            />
          </Field>

          <Field label="Активна" full>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              Группа набирает студентов
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
