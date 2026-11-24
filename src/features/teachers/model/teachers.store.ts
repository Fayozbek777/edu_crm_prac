import { create } from "zustand";
import type {
  CreateTeacherPayload,
  Teacher,
  TeacherListParams,
  UpdateTeacherPayload,
} from "../types/teachers.types";
import { teachersApi } from "../api/teachers.api";

interface TeachersState {
  items: Teacher[];
  count: number;
  loading: boolean;
  error: string | null;

  page: number;
  search: string;
  ordering: string;
  is_active: boolean | undefined;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setIsActive: (is_active: boolean | undefined) => void;
  setOrdering: (ordering: string) => void;

  fetch: () => Promise<void>;
  create: (data: CreateTeacherPayload) => Promise<Teacher>;
  update: (id: number, data: UpdateTeacherPayload) => Promise<Teacher>;
  remove: (id: number) => Promise<void>;
  reset: () => void;
}

const initial = {
  items: [] as Teacher[],
  count: 0,
  loading: false,
  error: null as string | null,
  page: 1,
  search: "",
  is_active: undefined as boolean | undefined,
  ordering: "-created_at",
};

export const useTeachersStore = create<TeachersState>((set, get) => ({
  ...initial,

  setPage: (page) => {
    set({ page });
    get().fetch();
  },
  setSearch: (search) => {
    set({ search, page: 1 });
    get().fetch();
  },
  setOrdering: (ordering) => {
    set({ ordering, page: 1 });
    get().fetch();
  },
  setIsActive: (is_active) => {
    set({ is_active, page: 1 });
    get().fetch();
  },

  fetch: async () => {
    set({ loading: true, error: null });
    const { page, search, ordering, is_active } = get();

    const params: TeacherListParams = { page, ordering };
    if (search) params.search = search;
    if (is_active !== undefined) params.is_active = is_active;

    try {
      const data = await teachersApi.list(params);
      set({ items: data.results, count: data.count, loading: false });
    } catch (e: any) {
      set({
        loading: false,
        error: e.response?.data?.message ?? "Ошибка загрузки",
      });
    }
  },

  create: async (data) => {
    const created = await teachersApi.create(data);
    get().fetch();
    return created;
  },

  update: async (id, data) => {
    const updated = await teachersApi.update(id, data);
    set({ items: get().items.map((c) => (c.id === id ? updated : c)) });
    return updated;
  },

  remove: async (id) => {
    await teachersApi.remove(id);
    get().fetch();
  },

  reset: () => set(initial),
}));
