import type { Paginated } from "../../../shared/api/types";
import type { StudentStatus } from "../../../shared/constants/statuses";

export interface Student {
  id: number;
  user: number | null;
  first_name: string;
  last_name: string;
  middle_name: string;
  full_name: string;
  birth_date: string | null;
  phone: string;
  parent_phone: string;
  email: string;
  address: string;
  photo: string | null;
  status: StudentStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface StudentsListParams {
  page?: number;
  search?: string;
  ordering?: string;
  status?: StudentStatus;
}

export type StudentsListResponse = Paginated<Student>;

export interface CreateStudentPayload {
  first_name: string;
  last_name: string;
  middle_name?: string;
  birth_date?: string | null;
  phone: string;
  parent_phone?: string;
  email?: string;
  address?: string;
  status?: StudentStatus;
  notes?: string;
  user?: number | null;
}

export type UpdateStudentPayload = Partial<CreateStudentPayload>;
