// src/features/teachers/index.ts
export {
  useTeachersList,
  useTeacher,
  useCreateTeacher,
  useUpdateTeacher,
  useRemoveTeacher,
  teachersKeys,
} from "./model/teacher.queries";

export type {
  Teacher,
  TeacherListParams,
  TeacherListResponse,
  CreateTeacherPayload,
  UpdateTeacherPayload,
} from "./types/teachers.types";

export { TeachersTable } from "./ui/TeachersTable";
export { TeachersFilters } from "./ui/TeachersFilters";
export { TeachersForm } from "./ui/TeachersForm";
export { TeachersCard } from "./ui/TeachersCard";
