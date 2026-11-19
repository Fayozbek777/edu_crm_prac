// Student
export const STUDENT_STATUS = {
  ACTIVE: "Активен",
  FROZEN: "Заморожен",
  GRADUATED: "Выпускник",
  LEFT: "Ушёл",
} as const;
export type StudentStatus = keyof typeof STUDENT_STATUS;

// Course
export const COURSE_LEVEL = {
  BEGINNER: "Начальный",
  INTERMEDIATE: "Средний",
  ADVANCED: "Продвинутый",
} as const;
export type CourseLevel = keyof typeof COURSE_LEVEL;

// Group
export const GROUP_STATUS = {
  RECRUITING: "Набор",
  ACTIVE: "Идёт",
  FINISHED: "Завершена",
  CANCELLED: "Отменена",
} as const;
export type GroupStatus = keyof typeof GROUP_STATUS;

// Payment
export const PAYMENT_METHOD = {
  CASH: "Наличные",
  CARD: "Карта",
  TRANSFER: "Перевод",
  ONLINE: "Онлайн",
} as const;

// Payment
export const PAYMENT_STATUS = {
  PENDING: "Ожидает",
  PAID: "Оплачен",
  REFUNDED: "Возврат",
  FAILED: "Ошибка",
} as const;

// Attendance
export const ATTENDANCE_STATUS = {
  PRESENT: "Присутствовал",
  ABSENT: "Отсутствовал",
  LATE: "Опоздал",
  EXCUSED: "По уваж. причине",
} as const;

// Lead
export const LEAD_STATUS = {
  NEW: "Новая",
  CONTACTED: "Связались",
  TRIAL: "Пробный урок",
  CONVERTED: "Записан",
  LOST: "Отказ",
} as const;

// Lead source zb uje
export const LEAD_SOURCE = {
  INSTAGRAM: "Instagram",
  TELEGRAM: "Telegram",
  WEBSITE: "Сайт",
  WALK_IN: "Пришли лично",
  REFERRAL: "Рекомендация",
  OTHER: "Другое",
} as const;

export function toOptions<T extends Record<string, string>>(obj: T) {
  return (Object.keys(obj) as (keyof T)[]).map((v) => ({
    value: v as string,
    label: obj[v],
  }));
}
