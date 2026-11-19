export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ListParams {
  page?: number;
  search?: string;
  ordering?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ApiErrorEnvelope {
  code: string;
  message: string;
  details: Record<string, string[]> | null;
  request_id: string;
}
