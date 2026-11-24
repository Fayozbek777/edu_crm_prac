// src/features/courses/api/courses.queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseApi } from "../api/courses.api";
import type {
  Course,
  CourseListParams,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "../types/courses.types";

export const coursesKeys = {
  all: ["courses"] as const,
  lists: () => [...coursesKeys.all, "list"] as const,
  list: (params: CourseListParams) => [...coursesKeys.lists(), params] as const,
  details: () => [...coursesKeys.all, "detail"] as const,
  detail: (id: number) => [...coursesKeys.details(), id] as const,
};

export function useCoursesList(params: CourseListParams) {
  return useQuery({
    queryKey: coursesKeys.list(params),
    queryFn: () => courseApi.list(params),
    placeholderData: (prev) => prev,
  });
}

export function useCourse(id: number | undefined) {
  return useQuery({
    queryKey: coursesKeys.detail(id ?? 0),
    queryFn: () => courseApi.get(id!),
    enabled: id !== undefined,
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCoursePayload) => courseApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: coursesKeys.lists() }),
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCoursePayload }) =>
      courseApi.update(id, data),
    onSuccess: (updated: Course) => {
      qc.setQueryData(coursesKeys.detail(updated.id), updated);
      qc.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

export function useRemoveCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => courseApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: coursesKeys.lists() }),
  });
}
