// src/features/students/ui/StudentsForm.tsx
import { useEffect, useState } from "react";
import { useStudentsStore } from "../model/students.store";
import type { Student } from "../types/students.types";
import type { StudentStatus } from "../../../shared/constants/statuses";

interface Props {
  student?: Student;
  onClose: () => void;
}

const empty = {
  first_name: "",
  last_name: "",
  middle_name: "",
  phone: "",
  parent_phone: "",
  email: "",
  address: "",
  status: "active" as StudentStatus,
  notes: "",
};

export function StudentsForm({ student, onClose }: Props) {
  const isEdit = Boolean(student);
  const create = useStudentsStore((s) => s.create);
  const update = useStudentsStore((s) => s.update);

  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (student) {
      setForm({
        first_name: student.first_name,
        last_name: student.last_name,
        middle_name: student.middle_name ?? "",
        phone: student.phone,
        parent_phone: student.parent_phone ?? "",
        email: student.email ?? "",
        address: student.address ?? "",
        status: student.status,
        notes: student.notes ?? "",
      });
    } else {
      setForm(empty);
    }
  }, [student]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        middle_name: form.middle_name.trim() || undefined,
        phone: form.phone.trim(),
        parent_phone: form.parent_phone.trim() || undefined,
        email: form.email.trim() || undefined,
        address: form.address.trim() || undefined,
        status: form.status,
        notes: form.notes.trim() || undefined,
      };
      if (isEdit && student) {
        await update(student.id, payload);
      } else {
        await create(payload);
      }
      onClose();
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Не удалось сохранить");
    } finally {
      setSaving(false);
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
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Редактировать студента" : "Новый студент"}
        </h2>

        {err && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Фамилия" required>
            <input
              required
              value={form.last_name}
              onChange={(e) => set("last_name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Имя" required>
            <input
              required
              value={form.first_name}
              onChange={(e) => set("first_name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Отчество">
            <input
              value={form.middle_name}
              onChange={(e) => set("middle_name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Статус">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as StudentStatus)}
              className={inputCls}
            >
              <option value="active">Активен</option>
              <option value="inactive">Неактивен</option>
              <option value="graduated">Выпускник</option>
            </select>
          </Field>
          <Field label="Телефон" required>
            <input
              required
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Телефон родителя">
            <input
              value={form.parent_phone}
              onChange={(e) => set("parent_phone", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Адрес">
            <input
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Заметки" full>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={inputCls}
            />
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
