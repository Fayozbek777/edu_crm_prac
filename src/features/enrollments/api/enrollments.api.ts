import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type {
  CreateEnrollMent,
  EnrollMent,
  EnrollMentListParams,
  EnrollMentListResponse,
  UpdateEnrollMent,
} from "../types/enrollments.types";

export const enrollMentApi = {
  list: (params: EnrollMentListParams): Promise<EnrollMentListResponse> =>
    apiClient
      .get(endpoints.enrollments.getEnrollments, { params })
      .then((r) => r.data),

  get: (id: number): Promise<EnrollMent> =>
    apiClient.get(endpoints.enrollments.getEnrollment(id)).then((r) => r.data),

  create: (data: CreateEnrollMent): Promise<EnrollMent> =>
    apiClient
      .post(endpoints.enrollments.addEnrollment, data)
      .then((r) => r.data),

  update: (id: number, data: UpdateEnrollMent): Promise<EnrollMent> =>
    apiClient
      .patch(endpoints.enrollments.enrollmentsFullUpdate(id), data)
      .then((r) => r.data),

  remove: (id: number): Promise<void> =>
    apiClient
      .delete(endpoints.enrollments.deleteEnrollment(id))
      .then(() => undefined),
};
