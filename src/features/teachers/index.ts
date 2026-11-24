// src/features/teachers/index.ts

// model
export { useTeachersStore } from "./model/teachers.store";

// types
export type {
  Teacher,
  TeacherListParams,
  TeacherListResponse,
  CreateTeacherPayload,
  UpdateTeacherPayload,
} from "./types/teachers.types";

// ui
export { TeachersTable } from "./ui/TeachersTable";
export { TeachersFilters } from "./ui/TeachersFilters";
export { TeachersForm } from "./ui/TeachersForm";
export { TeachersCard } from "./ui/TeachersCard";
