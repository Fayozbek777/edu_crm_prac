import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type {
  CreateTeacherPayload,
  Teacher,
  TeacherListParams,
  TeacherListResponse,
  UpdateTeacherPayload,
} from "../types/teachers.types";

export const teachersApi = {
  list: (params: TeacherListParams): Promise<TeacherListResponse> =>
    apiClient
      .get(endpoints.teachers.getTeachers, { params })
      .then((r) => r.data),

  get: (id: number): Promise<Teacher> =>
    apiClient.get(endpoints.teachers.getTeacher(id)).then((r) => r.data),

  create: (data: CreateTeacherPayload): Promise<Teacher> =>
    apiClient.post(endpoints.teachers.addTeacher, data).then((r) => r.data),

  update: (id: number, data: UpdateTeacherPayload): Promise<Teacher> =>
    apiClient
      .patch(endpoints.teachers.teacherFullUpdate(id), data)
      .then((r) => r.data),

  remove: (id: number): Promise<void> =>
    apiClient
      .delete(endpoints.teachers.deleteTeacher(id))
      .then(() => undefined),
};
