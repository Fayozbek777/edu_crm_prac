// src/features/courses/index.ts
export {
  useCoursesList,
  useCourse,
  useCreateCourse,
  useUpdateCourse,
  useRemoveCourse,
  coursesKeys,
} from "./model/courses.queries";

export type {
  Course,
  CourseListParams,
  CourseListResponse,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "./types/courses.types";

export { CoursesTable } from "./ui/CoursesTable";
export { CoursesFilters } from "./ui/CoursesFilters";
export { CoursesForm } from "./ui/CoursesForm";
export { CoursesCard } from "./ui/CoursesCard";
