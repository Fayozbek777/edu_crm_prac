// src/features/groups/model/groups.queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateGroupPayload,
  Group,
  GroupListParams,
  PatchGroupPayload,
} from "../types/groups.types";
import { groupApi } from "../api/groups.api";

export const groupsKeys = {
  all: ["groups"] as const, // ✅ "groups", не "teachers"
  lists: () => [...groupsKeys.all, "list"] as const,
  list: (params: GroupListParams) => [...groupsKeys.lists(), params] as const,
  details: () => [...groupsKeys.all, "detail"] as const,
  detail: (id: number) => [...groupsKeys.details(), id] as const,
};

export function useGroupList(params: GroupListParams) {
  return useQuery({
    queryKey: groupsKeys.list(params),
    queryFn: () => groupApi.list(params),
    placeholderData: (prev) => prev,
  });
}

export function useOneGroup(id: number | undefined) {
  return useQuery({
    queryKey: groupsKeys.detail(id ?? 0),
    queryFn: () => groupApi.get(id!),
    enabled: id !== undefined,
  });
}

// ✅ create → POST, не update
export function useCreateGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGroupPayload) => groupApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupsKeys.lists() });
    },
  });
}

// ✅ update → PATCH
export function useUpdateGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchGroupPayload }) =>
      groupApi.update(id, data),
    onSuccess: (updated: Group) => {
      qc.setQueryData(groupsKeys.detail(updated.id), updated);
      qc.invalidateQueries({ queryKey: groupsKeys.lists() });
    },
  });
}

export function useRemoveGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => groupApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupsKeys.lists() });
    },
  });
}
