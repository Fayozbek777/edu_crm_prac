import { usePagination as useUsefyPagination } from "@usefy/use-pagination";

export interface Args {
  page: number;
  pageSize: number;
  count: number;
  onChange: (page: number) => void;
}

export function usePagination({ page, pageSize, count, onChange }: Args) {
  const pagination = useUsefyPagination({
    total: count,
    pageSize,
    page,
    onChange,
  });

  return {
    page: pagination.page,
    totalPages: pagination.pageCount,
    count,
    hasPrev: pagination.canPrev,
    hasNext: pagination.canNext,
    prev: pagination.prev,
    next: pagination.next,
    goTo: pagination.setPage,
    range: pagination.items,
    sliceRange: pagination.range,
  };
}
