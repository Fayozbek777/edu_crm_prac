import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateEnrollMent,
  EnrollMent,
  EnrollMentListParams,
  UpdateEnrollMent,
} from "../types/enrollments.types";
import { enrollMentApi } from "../api/enrollments.api";

export const enrollMentKeys = {
  all: ["enrollments"] as const,
  lists: () => [...enrollMentKeys.all, "list"] as const,
  list: (params: EnrollMentListParams) =>
    [...enrollMentKeys.lists(), params] as const,
  details: () => [...enrollMentKeys.all, "detail"] as const,
  detail: (id: number) => [...enrollMentKeys.details(), id] as const,
};

export function useEnrollMentList(params: EnrollMentListParams) {
  return useQuery({
    queryKey: enrollMentKeys.list(params),
    queryFn: () => enrollMentApi.list(params),
    placeholderData: (prev) => prev,
  });
}

export function useOneEnrollment(id: number | undefined) {
  return useQuery({
    queryKey: enrollMentKeys.detail(id ?? 0),
    queryFn: () => enrollMentApi.get(id!),
    enabled: id !== undefined,
  });
}

export function useCreateEnrollment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEnrollMent) => enrollMentApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: enrollMentKeys.lists() });
    },
  });
}

export function useUpdateEnrollment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEnrollMent }) =>
      enrollMentApi.update(id, data),
    onSuccess: (updated: EnrollMent) => {
      qc.setQueryData(enrollMentKeys.detail(updated.id), updated);
      qc.invalidateQueries({ queryKey: enrollMentKeys.lists() });
    },
  });
}

export function useRemoveEnrollment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => enrollMentApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: enrollMentKeys.lists() });
    },
  });
}
