import type { Paginated } from "../../../shared/api/types";
import type { CourseLevel } from "../../../shared/constants/statuses";

export interface Course {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  price: string;
  duration_months: number;
  lessons_count: number;
  cover: string;
  is_active: boolean;
  created_at: string;
}

export interface CourseListParams {
  page?: number;
  search?: string;
  ordering?: string;
  is_active?: boolean;
  level?: CourseLevel;
}

export type CourseListResponse = Paginated<Course>;

export interface CreateCoursePayload {
  title: string;
  description: string;
  level: CourseLevel;
  price: string;
  duration_months: number;
  lessons_count: number;
  cover: string;
  is_active: boolean;
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;
