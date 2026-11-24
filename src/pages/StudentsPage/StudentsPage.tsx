// src/pages/StudentsPage.tsx
import { useEffect, useState } from "react";
import { StudentsCard } from "../../features/students/ui/StudentsCard";
import { StudentsFilters } from "../../features/students/ui/StudentsFilters";
import { StudentsForm } from "../../features/students/ui/StudentsForm";
import { StudentsTable } from "../../features/students/ui/StudentsTable";
import type { Student } from "../../features/students/types/students.types";
import { useStudentsStore } from "../../features/students";

export function StudentsPage() {
  const fetch = useStudentsStore((s) => s.fetch);
  const items = useStudentsStore((s) => s.items);
  const loading = useStudentsStore((s) => s.loading);
  const error = useStudentsStore((s) => s.error);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Student | undefined>(undefined);

  // Первичная загрузка. Дальше фильтры сами дергают fetch.
  useEffect(() => {
    fetch();
  }, [fetch]);

  const openCreate = () => {
    setEditing(undefined);
    setIsFormOpen(true);
  };

  const openEdit = (student: Student) => {
    setEditing(student);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(undefined);
  };

  return (
    <div className="container-responsive py-6">
      {/* Шапка */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Студенты</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Управление карточками студентов
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          + Добавить студента
        </button>
      </div>

      {/* Фильтры */}
      <div className="mb-4">
        <StudentsFilters />
      </div>

      {/* Контент: состояния + таблица/карточки */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Загрузка…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-gray-900">
            Студентов не найдено
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Измените фильтры или добавьте нового студента.
          </p>
          <button
            onClick={openCreate}
            className="mt-4 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            + Добавить студента
          </button>
        </div>
      ) : (
        <>
          {/* Десктоп: таблица */}
          <div className="hidden md:block">
            <StudentsTable onEdit={openEdit} />
          </div>

          {/* Мобилка: карточки */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {items.map((s) => (
              <StudentsCard key={s.id} student={s} onEdit={openEdit} />
            ))}
          </div>
        </>
      )}

      {/* Модалка создания/редактирования */}
      {isFormOpen && <StudentsForm student={editing} onClose={closeForm} />}
    </div>
  );
}
