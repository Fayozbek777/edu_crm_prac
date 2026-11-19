export const ROLE_LABELS = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  TEACHER: "Преподаватель",
  STUDENT: "Студент",
} as const;

export type Role = keyof typeof ROLE_LABELS;

export const ROLE_OPTIONS = (Object.keys(ROLE_LABELS) as Role[]).map((v) => ({
  value: v,
  label: ROLE_LABELS[v],
}));
