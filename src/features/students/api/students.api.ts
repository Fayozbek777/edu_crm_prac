import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type {
  CreateStudentPayload,
  Student,
  StudentsListParams,
  StudentsListResponse,
  UpdateStudentPayload,
} from "../types/students.types";

export const studentsApi = {
  list: (params: StudentsListParams): Promise<StudentsListResponse> =>
    apiClient
      .get(endpoints.students.getStudents, { params })
      .then((r) => r.data),

  get: (id: number): Promise<Student> =>
    apiClient.get(endpoints.students.getStudent(id)).then((r) => r.data),

  create: (data: CreateStudentPayload): Promise<Student> =>
    apiClient.post(endpoints.students.addStudent, data).then((r) => r.data),

  update: (id: number, data: UpdateStudentPayload): Promise<Student> =>
    apiClient
      .patch(endpoints.students.studentFullUpdate(id), data)
      .then((r) => r.data),

  remove: (id: number): Promise<void> =>
    apiClient
      .delete(endpoints.students.deleteStudent(id))
      .then(() => undefined),
};
