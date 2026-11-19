import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import type { Paginated, ListParams } from "../../../shared/api/types";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  UpdateMePayload,
  User,
  UsersListParams,
} from "../types/auth.types";

export const authApi = {
  login: (data: LoginPayload): Promise<LoginResponse> =>
    apiClient.post(endpoints.auth.login, data).then((r) => r.data),

  refresh: (refresh: string): Promise<{ access: string }> =>
    apiClient
      .post(endpoints.auth.updateAccess, { refresh })
      .then((r) => r.data),

  me: (): Promise<User> =>
    apiClient.get(endpoints.auth.getMe).then((r) => r.data),

  updateMe: (data: UpdateMePayload): Promise<User> =>
    apiClient.patch(endpoints.auth.updateMe, data).then((r) => r.data),

  register: (data: RegisterPayload): Promise<User> =>
    apiClient.post(endpoints.auth.register, data).then((r) => r.data),

  getUsers: (params: UsersListParams): Promise<Paginated<User>> =>
    apiClient.get(endpoints.auth.getUsers, { params }).then((r) => r.data),

  getUser: (id: number): Promise<User> =>
    apiClient.get(endpoints.auth.getOneUser(id)).then((r) => r.data),

  createUser: (data: RegisterPayload & { role: string }): Promise<User> =>
    apiClient.post(endpoints.auth.createUser, data).then((r) => r.data),

  updateUser: (id: number, data: Partial<User>): Promise<User> =>
    apiClient
      .patch(endpoints.auth.partiallyUpdate(id), data)
      .then((r) => r.data),

  deleteUser: (id: number): Promise<void> =>
    apiClient.delete(endpoints.auth.deleteUser(id)).then(() => undefined),
};
