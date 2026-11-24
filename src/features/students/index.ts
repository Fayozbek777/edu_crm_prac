// src/features/students/index.ts

// queries (TanStack Query) — вместо store
export {
  useStudentsList,
  useStudent,
  useCreateStudent,
  useUpdateStudent,
  useRemoveStudent,
  studentsKeys,
} from "./model/students.queries";

// types
export type {
  Student,
  StudentsListParams,
  StudentsListResponse,
  CreateStudentPayload,
  UpdateStudentPayload,
} from "./types/students.types";

// ui
export { StudentsTable } from "./ui/StudentsTable";
export { StudentsFilters } from "./ui/StudentsFilters";
export { StudentsForm } from "./ui/StudentsForm";
export { StudentsCard } from "./ui/StudentsCard";
