import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCreateEnrollment,
  useUpdateEnrollment,
} from "../model/enrollmets.queries";
import type { EnrollMent, OptionItem } from "../types/enrollments.types";
import { useStudentsList } from "../../students";
import { useGroupList } from "../../groups";
import { useDebounce } from "../../../shared/hooks/useDebounce";

interface Props {
  enrollment?: EnrollMent;
  onClose: () => void;
}

interface FormState {
  student: number | "";
  group: number | "";
  discount_percent: string;
  is_active: boolean;
}

const empty: FormState = {
  student: "",
  group: "",
  discount_percent: "0",
  is_active: true,
};

export function EnrollmentsForm({ enrollment, onClose }: Props) {
  const isEdit = Boolean(enrollment);
  const createMutation = useCreateEnrollment();
  const updateMutation = useUpdateEnrollment();
  const saving = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState<FormState>(empty);
  const [err, setErr] = useState<string | null>(null);

  const [studentQuery, setStudentQuery] = useState("");
  const [studentOpen, setStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<OptionItem | null>(
    null,
  );
  const debouncedQuery = useDebounce(studentQuery.trim(), 400);
  const studentBoxRef = useRef<HTMLDivElement>(null);

  const studentsQuery = useStudentsList({ page: 1, search: debouncedQuery });

  const students: OptionItem[] = useMemo(
    () =>
      studentsQuery.data?.results.map((s) => ({
        value: s.id,
        label: s.full_name || `${s.last_name} ${s.first_name}`.trim(),
      })) ?? [],
    [studentsQuery.data],
  );

  const groupsQuery = useGroupList({ page: 1, search: "" });
  const groups: OptionItem[] = useMemo(
    () =>
      groupsQuery.data?.results.map((g) => ({ value: g.id, label: g.name })) ??
      [],
    [groupsQuery.data],
  );

  useEffect(() => {
    if (enrollment) {
      setForm({
        student: enrollment.student,
        group: enrollment.group,
        discount_percent: String(enrollment.discount_percent ?? "0"),
        is_active: enrollment.is_active,
      });
      setSelectedStudent({
        value: enrollment.student,
        label: enrollment.student_name,
      });
      setStudentQuery(enrollment.student_name ?? "");
    } else {
      setForm(empty);
      setSelectedStudent(null);
      setStudentQuery("");
    }
  }, [enrollment]);

  useEffect(() => {
    if (!studentOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        studentBoxRef.current &&
        !studentBoxRef.current.contains(e.target as Node)
      ) {
        setStudentOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [studentOpen]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const pickStudent = (item: OptionItem) => {
    set("student", item.value);
    setSelectedStudent(item);
    setStudentQuery(item.label);
    setStudentOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!form.student) return setErr("Выберите студента из списка");
    if (!form.group) return setErr("Выберите группу");

    const discount = Number(form.discount_percent);
    if (Number.isNaN(discount) || discount < 0 || discount > 100)
      return setErr("Скидка должна быть от 0 до 100");

    const payload = {
      student: Number(form.student),
      group: Number(form.group),
      discount_percent: discount,
      is_active: form.is_active,
    };

    try {
      if (isEdit && enrollment) {
        await updateMutation.mutateAsync({ id: enrollment.id, data: payload });
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

  const isSearching = studentsQuery.isFetching;

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
          {isEdit ? "Редактировать запись" : "Новая запись"}
        </h2>

        {err && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Студент" required full>
            <div ref={studentBoxRef} className="relative">
              <input
                type="text"
                value={studentQuery}
                onChange={(e) => {
                  const v = e.target.value;
                  setStudentQuery(v);
                  setStudentOpen(true);
                  if (selectedStudent && v !== selectedStudent.label) {
                    setSelectedStudent(null);
                    set("student", "");
                  }
                }}
                onFocus={() => setStudentOpen(true)}
                placeholder="Начните вводить имя…"
                className={inputCls}
                autoComplete="off"
              />
              {selectedStudent && (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-600">
                  ✓ выбран
                </span>
              )}

              {studentOpen && (
                <div className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                  {isSearching && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Поиск…
                    </div>
                  )}
                  {!isSearching && students.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Ничего не найдено
                    </div>
                  )}
                  {!isSearching &&
                    students.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => pickStudent(s)}
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        {s.label}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </Field>

          <Field label="Группа" required full>
            <select
              required
              value={form.group}
              onChange={(e) =>
                set("group", e.target.value ? Number(e.target.value) : "")
              }
              className={inputCls}
            >
              <option value="">— выберите —</option>
              {groups.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Скидка, %">
            <input
              type="number"
              min={0}
              max={100}
              value={form.discount_percent}
              onChange={(e) => set("discount_percent", e.target.value)}
              onBlur={(e) => {
                const n = Number(e.target.value);
                set(
                  "discount_percent",
                  String(Number.isNaN(n) ? 0 : Math.min(100, Math.max(0, n))),
                );
              }}
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
              Запись активна
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
