import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentsApi } from "../api/students.api";
import type {
  CreateStudentPayload,
  Student,
  StudentsListParams,
  UpdateStudentPayload,
} from "../types/students.types";

//  queryKeys
export const studentsKeys = {
  all: ["students"] as const,
  lists: () => [...studentsKeys.all, "list"] as const,
  list: (params: StudentsListParams) =>
    [...studentsKeys.lists(), params] as const,
  details: () => [...studentsKeys.all, "detail"] as const,
  detail: (id: number) => [...studentsKeys.details(), id] as const,
};

export function useStudentsList(params: StudentsListParams) {
  return useQuery({
    queryKey: studentsKeys.list(params),
    queryFn: () => studentsApi.list(params),
    placeholderData: (prev) => prev,
  });
}

//  odin telka
export function useStudent(id: number | undefined) {
  return useQuery({
    queryKey: studentsKeys.detail(id ?? 0),
    queryFn: () => studentsApi.get(id!),
    enabled: id !== undefined,
  });
}

// create
export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStudentPayload) => studentsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: studentsKeys.lists() });
    },
  });
}

// update
export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateStudentPayload }) =>
      studentsApi.update(id, data),
    onSuccess: (updated: Student) => {
      qc.setQueryData(studentsKeys.detail(updated.id), updated);
      qc.invalidateQueries({ queryKey: studentsKeys.lists() });
    },
  });
}

// delete naxuy
export function useRemoveStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => studentsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: studentsKeys.lists() });
    },
  });
}
