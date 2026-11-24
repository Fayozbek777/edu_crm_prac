// src/shared/lib/formatPhone.ts

/** Оставляет только цифры, максимум 9 (после +998) */
export function extractPhoneDigits(raw: string | null | undefined): string {
  if (!raw) return "";
  // если в строке есть 998 в начале — отрезаем, чтобы не дублировать
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998") && digits.length > 9) {
    digits = digits.slice(3);
  }
  return digits.slice(0, 9);
}

/** 9 цифр → "55 555 55 55" (без +998) */
export function formatUzPhoneDigits(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 9);
  const p1 = d.slice(0, 2);
  const p2 = d.slice(2, 5);
  const p3 = d.slice(5, 7);
  const p4 = d.slice(7, 9);
  return [p1, p2, p3, p4].filter(Boolean).join(" ");
}

/** Для отображения: "555555555" → "+998 55 555 55 55" */
export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return "—";
  const digits = raw.replace(/\D/g, "");
  // уже с 998
  if (digits.length === 12 && digits.startsWith("998")) {
    return `+998 ${formatUzPhoneDigits(digits.slice(3))}`;
  }
  // 9 цифр без кода страны
  if (digits.length === 9) {
    return `+998 ${formatUzPhoneDigits(digits)}`;
  }
  return "—";
}

/** Для отправки на бэк: "55 555 55 55" → "+998555555555" */
export function normalizePhone(raw: string | null | undefined): string {
  if (!raw) return "";
  const digits = extractPhoneDigits(raw);
  if (digits.length !== 9) return "";
  return `+998${digits}`;
}
