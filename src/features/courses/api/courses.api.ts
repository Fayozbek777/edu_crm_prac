import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type {
  Course,
  CourseListParams,
  CourseListResponse,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "../types/courses.types";

export const courseApi = {
  list: (params: CourseListParams): Promise<CourseListResponse> =>
    apiClient.get(endpoints.courses.getCourses, { params }).then((r) => r.data),

  get: (id: number): Promise<Course> =>
    apiClient.get(endpoints.courses.getCourse(id)).then((r) => r.data),

  create: (data: CreateCoursePayload): Promise<Course> =>
    apiClient.post(endpoints.courses.addCourse, data).then((r) => r.data),

  update: (id: number, data: UpdateCoursePayload): Promise<Course> =>
    apiClient
      .patch(endpoints.courses.courseFullUpdate(id), data)
      .then((r) => r.data),

  remove: (id: number): Promise<void> =>
    apiClient.delete(endpoints.courses.deleteCourse(id)).then(() => undefined),
};
