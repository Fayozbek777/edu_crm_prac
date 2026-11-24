import { create } from "zustand";
import { studentsApi } from "../api/students.api";
import type {
  CreateStudentPayload,
  Student,
  StudentsListParams,
  UpdateStudentPayload,
} from "../types/students.types";
import type { StudentStatus } from "../../../shared/constants/statuses";

interface StudentsState {
  items: Student[];
  count: number;
  loading: boolean;
  error: string | null;

  page: number;
  search: string;
  status?: StudentStatus;
  ordering: string;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatus: (status?: StudentStatus) => void;
  setOrdering: (ordering: string) => void;

  fetch: () => Promise<void>;
  create: (data: CreateStudentPayload) => Promise<Student>;
  update: (id: number, data: UpdateStudentPayload) => Promise<Student>;
  remove: (id: number) => Promise<void>;
  reset: () => void;
}

const initial = {
  items: [] as Student[],
  count: 0,
  loading: false,
  error: null as string | null,
  page: 1,
  search: "",
  status: undefined as StudentStatus | undefined,
  ordering: "-created_at",
};

export const useStudentsStore = create<StudentsState>((set, get) => ({
  ...initial,

  setPage: (page) => {
    set({ page });
    get().fetch();
  },
  setSearch: (search) => {
    set({ search, page: 1 });
    get().fetch();
  },
  setStatus: (status) => {
    set({ status, page: 1 });
    get().fetch();
  },
  setOrdering: (ordering) => {
    set({ ordering, page: 1 });
    get().fetch();
  },

  fetch: async () => {
    set({ loading: true, error: null });
    const { page, search, status, ordering } = get();
    const params: StudentsListParams = { page, ordering };
    if (search) params.search = search;
    if (status) params.status = status;

    try {
      const data = await studentsApi.list(params);
      set({ items: data.results, count: data.count, loading: false });
    } catch (e: any) {
      set({
        loading: false,
        error: e.response?.data?.message ?? "Ошибка загрузки",
      });
    }
  },

  create: async (data) => {
    const created = await studentsApi.create(data);
    get().fetch();
    return created;
  },

  update: async (id, data) => {
    const updated = await studentsApi.update(id, data);
    set({ items: get().items.map((s) => (s.id === id ? updated : s)) });
    return updated;
  },

  remove: async (id) => {
    await studentsApi.remove(id);
    get().fetch();
  },

  reset: () => set(initial),
}));
