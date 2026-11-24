// src/pages/TeachersPage/TeachersPage.tsx
import { useEffect, useState } from "react";
import {
  TeachersFilters,
  TeachersTable,
  TeachersCard,
  TeachersForm,
  useTeachersStore,
} from "../../features/teachers";
import type { Teacher } from "../../features/teachers";

export default function TeachersPage() {
  const fetch = useTeachersStore((s) => s.fetch);
  const items = useTeachersStore((s) => s.items);
  const loading = useTeachersStore((s) => s.loading);
  const error = useTeachersStore((s) => s.error);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | undefined>(undefined);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const openCreate = () => {
    setEditing(undefined);
    setIsFormOpen(true);
  };

  const openEdit = (teacher: Teacher) => {
    setEditing(teacher);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(undefined);
  };

  return (
    <div className="space-y-4">
      {/* Шапка */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Преподаватели</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Управление карточками преподавателей
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          + Добавить преподавателя
        </button>
      </div>

      {/* Фильтры */}
      <TeachersFilters />

      {/* Ошибка */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Контент */}
      {loading && items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Загрузка…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-gray-900">
            Преподавателей не найдено
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Измените фильтры или добавьте нового преподавателя.
          </p>
          <button
            onClick={openCreate}
            className="mt-4 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            + Добавить преподавателя
          </button>
        </div>
      ) : (
        <>
          {/* Десктоп: таблица */}
          <div className="hidden md:block">
            <TeachersTable onEdit={openEdit} />
          </div>

          {/* Мобилка: карточки */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {items.map((t) => (
              <TeachersCard key={t.id} teacher={t} onEdit={openEdit} />
            ))}
          </div>
        </>
      )}

      {/* Модалка */}
      {isFormOpen && <TeachersForm teacher={editing} onClose={closeForm} />}
    </div>
  );
}
