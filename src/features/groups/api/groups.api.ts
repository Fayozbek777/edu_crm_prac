import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type {
  CreateGroupPayload,
  Group,
  GroupListParams,
  GroupListResponse,
  UpdateGroupPayload,
} from "../types/groups.types";

export const groupApi = {
  list: (params: GroupListParams): Promise<GroupListResponse> =>
    apiClient.get(endpoints.groups.getGroups, { params }).then((r) => r.data),

  get: (id: number): Promise<Group> =>
    apiClient.get(endpoints.groups.getGroup(id)).then((r) => r.data),

  create: (data: CreateGroupPayload): Promise<Group> =>
    apiClient.post(endpoints.groups.addGroup, data).then((r) => r.data),

  update: (id: number, data: UpdateGroupPayload): Promise<Group> =>
    apiClient
      .patch(endpoints.groups.groupFullUpdate(id), data)
      .then((r) => r.data),
  remove: (id: number): Promise<void> =>
    apiClient.delete(endpoints.groups.deleteGroup(id)).then(() => undefined),
};
