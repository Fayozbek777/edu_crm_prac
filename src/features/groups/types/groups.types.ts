import type { Paginated } from "../../../shared/api/types";
import type { GroupStatus } from "../../../shared/constants/statuses";

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  level: string;
  price: string;
  duration_months: number;
  lessons_count: number;
  cover: string | null;
  is_active: boolean;
  created_at: string;
}

export interface TeacherDetail {
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

export interface Group {
  id: number;
  course_detail: CourseDetail;
  teacher_detail: TeacherDetail | null;
  students_count: number;
  name: string;
  classroom: string;
  status: GroupStatus;
  max_students: number;
  start_date: string;
  end_date: string;
  schedule: string;
  created_at: string;
  course: number;
  teacher: number | null;
}

export interface CreateGroupPayload {
  name: string;
  classroom: string;
  status: GroupStatus;
  max_students: number;
  start_date: string;
  end_date: string;
  schedule: string;
  course: number;
  teacher: number | null;
}

export type UpdateGroupPayload = CreateGroupPayload;

export type PatchGroupPayload = Partial<CreateGroupPayload>;

export interface GroupListParams {
  page?: number;
  search?: string;
  ordering?: string;
  course?: number;
  status?: GroupStatus;
  teacher?: number;
}

export type GroupListResponse = Paginated<Group>;
