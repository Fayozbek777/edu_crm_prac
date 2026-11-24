// src/features/teachers/ui/TeachersForm.tsx
import { useEffect, useState } from "react";
import { useTeachersStore } from "../model/teachers.store";
import type { Teacher } from "../types/teachers.types";
import {
  extractPhoneDigits,
  normalizePhone,
} from "../../../shared/lib/formatPhone";
import { formatEmail } from "../../../shared/lib/formatEmail";
import { PhoneInput } from "../../../shared/ui/PhoneInput";

interface Props {
  teacher?: Teacher;
  onClose: () => void;
}

const empty = {
  first_name: "",
  last_name: "",
  phone: "", // 9 цифр
  email: "",
  bio: "",
  specialization: "",
  experience_years: 0,
  rating: "",
  is_active: true,
};

export function TeachersForm({ teacher, onClose }: Props) {
  const isEdit = Boolean(teacher);
  const create = useTeachersStore((s) => s.create);
  const update = useTeachersStore((s) => s.update);

  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (teacher) {
      setForm({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        phone: extractPhoneDigits(teacher.phone),
        email: teacher.email ?? "",
        bio: teacher.bio ?? "",
        specialization: teacher.specialization ?? "",
        experience_years: teacher.experience_years ?? 0,
        rating: teacher.rating ?? "",
        is_active: teacher.is_active,
      });
    } else {
      setForm(empty);
    }
  }, [teacher]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (form.phone.length !== 9) {
      setErr("Введите телефон полностью: 9 цифр");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: normalizePhone(form.phone),
        email: form.email.trim(),
        specialization: form.specialization.trim(),
        experience_years: Number(form.experience_years) || 0,
        is_active: form.is_active,
        bio: form.bio.trim() || undefined,
        rating: form.rating.trim() || undefined,
      };

      if (isEdit && teacher) await update(teacher.id, payload);
      else await create(payload);
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
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Редактировать преподавателя" : "Новый преподаватель"}
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
          <Field label="Телефон" required>
            <PhoneInput
              required
              value={form.phone}
              onChange={(digits) => set("phone", digits)}
            />
          </Field>
          <Field label="Email" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => {
                const f = formatEmail(form.email);
                set("email", f === "—" ? "" : f);
              }}
              className={inputCls}
            />
          </Field>
          <Field label="Специализация" required full>
            <input
              required
              value={form.specialization}
              onChange={(e) => set("specialization", e.target.value)}
              placeholder="Например: Математика, IELTS, Frontend"
              className={inputCls}
            />
          </Field>
          <Field label="Стаж (лет)">
            <input
              type="number"
              min={0}
              value={form.experience_years}
              onChange={(e) =>
                set("experience_years", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>
          <Field label="Рейтинг (0–5)">
            <input
              type="number"
              min={0}
              max={5}
              step="0.01"
              value={form.rating}
              onChange={(e) => set("rating", e.target.value)}
              placeholder="4.75"
              className={inputCls}
            />
          </Field>
          <Field label="Биография" full>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
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
              Преподаватель принимает занятия
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
