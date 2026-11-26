// src/pages/GroupsPage/GroupsPage.tsx
import { useState } from "react";
import {
  GroupsCard,
  GroupsFilters,
  GroupsForm,
  GroupsTable,
  useGroupList,
} from "../../features/groups";
import type { Group, GroupListParams } from "../../features/groups";

export default function GroupsPage() {
  const [params, setParams] = useState<GroupListParams>({
    page: 1,
    ordering: "-created_at",
  });

  const { data, isLoading, isFetching, error, refetch } = useGroupList(params);

  const items = data?.results ?? [];
  const count = data?.count ?? 0;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Group | undefined>(undefined);

  const openCreate = () => {
    setEditing(undefined);
    setIsFormOpen(true);
  };
  const openEdit = (g: Group) => {
    setEditing(g);
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(undefined);
  };

  return (
    <div className="container-responsive py-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Группы</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Управление учебными группами
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Обновить
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            + Добавить группу
          </button>
        </div>
      </div>

      <div className="mb-4">
        <GroupsFilters params={params} onChange={setParams} />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {(error as any)?.response?.data?.message ?? "Ошибка загрузки"}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Загрузка…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-gray-900">Групп не найдено</p>
          <p className="mt-1 text-sm text-gray-500">
            Измените фильтры или добавьте новую группу.
          </p>
          <button
            onClick={openCreate}
            className="mt-4 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            + Добавить группу
          </button>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <GroupsTable
              items={items}
              count={count}
              page={params.page ?? 1}
              isFetching={isFetching}
              onPageChange={(page) => setParams((p) => ({ ...p, page }))}
              onEdit={openEdit}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {items.map((g) => (
              <GroupsCard key={g.id} group={g} onEdit={openEdit} />
            ))}
          </div>
        </>
      )}

      {isFormOpen && <GroupsForm group={editing} onClose={closeForm} />}
    </div>
  );
}
