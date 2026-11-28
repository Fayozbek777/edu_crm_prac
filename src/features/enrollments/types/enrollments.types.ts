import type { Paginated } from "../../../shared/api/types";

export interface EnrollMent {
  id: number;
  student_name: string;
  group_name: string;
  enrolled_at: string;
  is_active: boolean;
  discount_percent: string;
  student: number;
  group: number;
}

export interface CreateEnrollMent {
  is_active: boolean;
  discount_percent: number;
  student: number;
  group: number;
}

export type UpdateEnrollMent = CreateEnrollMent;

export interface EnrollMentListParams {
  page?: number;
  search?: string;
  student?: number;
  group?: number;
  is_active?: boolean;
  ordering?: string;
}

export type EnrollMentListResponse = Paginated<EnrollMent>;

export interface OptionItem {
  value: number;
  label: string;
}
