import type { Paginated } from "../../../shared/api/types";

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  bio: string;
  photo: string | null;
  specialization: string;
  experience_years: number;
  rating: string;
  is_active: boolean;
  created_at: string;
  user: number | null;
}

export interface TeacherListParams {
  page?: number;
  search?: string;
  ordering?: string;
  is_active?: boolean;
}

export type TeacherListResponse = Paginated<Teacher>;

export interface CreateTeacherPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  bio: string;
  photo: string | null;
  specialization: string;
  experience_years: number;
  rating: string;
  is_active: boolean;
  user: number | null;
}

export type UpdateTeacherPayload = Partial<CreateTeacherPayload>;
