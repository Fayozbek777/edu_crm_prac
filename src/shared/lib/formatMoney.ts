export function formatMoney(
  value: string | number | null | undefined,
  currency = "soʻm",
): string {
  if (value == null || value === "") return "—";
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(n)) return "—";
  return `${n.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
  })} ${currency}`;
}
