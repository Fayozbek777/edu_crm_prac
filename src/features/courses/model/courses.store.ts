import { create } from "zustand";
import type { CourseLevel } from "../../../shared/constants/statuses";
import type {
  Course,
  CourseListParams,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "../types/courses.types";
import { courseApi } from "../api/courses.api";

interface CoursesState {
  items: Course[];
  count: number;
  loading: boolean;
  error: string | null;

  page: number;
  search: string;
  ordering: string;
  is_active: boolean | undefined;
  level: CourseLevel | undefined;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setOrdering: (ordering: string) => void;
  setIsActive: (is_active: boolean | undefined) => void;
  setLevel: (level: CourseLevel | undefined) => void;

  fetch: () => Promise<void>;
  create: (data: CreateCoursePayload) => Promise<Course>;
  update: (id: number, data: UpdateCoursePayload) => Promise<Course>;
  remove: (id: number) => Promise<void>;
  reset: () => void;
}

const initial = {
  items: [] as Course[],
  count: 0,
  loading: false,
  error: null as string | null,
  page: 1,
  search: "",
  ordering: "-created_at",
  is_active: undefined as boolean | undefined,
  level: undefined as CourseLevel | undefined,
};

export const useCoursesStore = create<CoursesState>((set, get) => ({
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
  setLevel: (level) => {
    set({ level, page: 1 });
    get().fetch();
  },

  fetch: async () => {
    set({ loading: true, error: null });
    const { page, search, ordering, is_active, level } = get();

    const params: CourseListParams = { page, ordering };
    if (search) params.search = search;
    if (is_active !== undefined) params.is_active = is_active;
    if (level !== undefined) params.level = level;

    try {
      const data = await courseApi.list(params);
      set({ items: data.results, count: data.count, loading: false });
    } catch (e: any) {
      set({
        loading: false,
        error: e.response?.data?.message ?? "Ошибка загрузки",
      });
    }
  },

  create: async (data) => {
    const created = await courseApi.create(data);
    get().fetch();
    return created;
  },

  update: async (id, data) => {
    const updated = await courseApi.update(id, data);
    set({ items: get().items.map((c) => (c.id === id ? updated : c)) });
    return updated;
  },

  remove: async (id) => {
    await courseApi.remove(id);
    get().fetch();
  },

  reset: () => set(initial),
}));
