// src/features/teachers/api/teachers.queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teachersApi } from "../api/teachers.api";
import type {
  CreateTeacherPayload,
  Teacher,
  TeacherListParams,
  UpdateTeacherPayload,
} from "../types/teachers.types";

// === queryKeys ===
export const teachersKeys = {
  all: ["teachers"] as const,
  lists: () => [...teachersKeys.all, "list"] as const,
  list: (params: TeacherListParams) =>
    [...teachersKeys.lists(), params] as const,
  details: () => [...teachersKeys.all, "detail"] as const,
  detail: (id: number) => [...teachersKeys.details(), id] as const,
};

// === список ===
export function useTeachersList(params: TeacherListParams) {
  return useQuery({
    queryKey: teachersKeys.list(params),
    queryFn: () => teachersApi.list(params),
    placeholderData: (prev) => prev,
  });
}

// === один ===
export function useTeacher(id: number | undefined) {
  return useQuery({
    queryKey: teachersKeys.detail(id ?? 0),
    queryFn: () => teachersApi.get(id!),
    enabled: id !== undefined,
  });
}

// === create ===
export function useCreateTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTeacherPayload) => teachersApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teachersKeys.lists() });
    },
  });
}

// === update ===
export function useUpdateTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTeacherPayload }) =>
      teachersApi.update(id, data),
    onSuccess: (updated: Teacher) => {
      qc.setQueryData(teachersKeys.detail(updated.id), updated);
      qc.invalidateQueries({ queryKey: teachersKeys.lists() });
    },
  });
}

// === remove ===
export function useRemoveTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => teachersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teachersKeys.lists() });
    },
  });
}
