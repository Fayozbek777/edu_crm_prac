import type { AxiosError } from "axios";

type ApiErrorBody = {
  message?: string;
  request_id?: string;
  [key: string]: unknown;
};

const DEFAULT_RETRY_AFTER_SEC = 5;

export function logApiError(
  status: number | undefined,
  error: AxiosError,
): void {
  const raw = error.response?.data;
  const body =
    raw && typeof raw === "object" ? (raw as ApiErrorBody) : undefined;

  if (status === 403) {
    console.warn("[API 403]", body?.message ?? "Нет доступа");
    return;
  }

  if (status === 429) {
    const retryAfter =
      Number(error.response?.headers["retry-after"]) || DEFAULT_RETRY_AFTER_SEC;
    console.warn(`[API 429] Подожди ${retryAfter} сек.`);
    return;
  }

  if (status !== undefined && status >= 500) {
    console.error("[API 5xx]", {
      url: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`,
      request_id: body?.request_id,
      body: body ?? String(raw ?? "").slice(0, 200),
    });
  }
}
