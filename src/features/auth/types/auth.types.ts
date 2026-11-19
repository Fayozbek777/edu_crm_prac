import type { Paginated } from "../../../shared/api/types";

export type Role = "ADMIN" | "MANAGER" | "TEACHER" | "STUDENT";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  phone: string;
  avatar: string | null;
  is_active: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshPayload {
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export type RegisterResponse = User;

export type UpdateMePayload = Partial<Omit<User, "id" | "role" | "is_active">>;
export type UpdateMeResponse = User;

export interface UsersListParams {
  page?: number;
  search?: string;
  ordering?: string;
  role?: Role;
  is_active?: boolean;
}

export type UsersListResponse = Paginated<User>;

export interface CreateUserPayload extends RegisterPayload {
  role: Role;
  is_active?: boolean;
}

export type CreateUserResponse = User;
