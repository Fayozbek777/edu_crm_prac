type Props = {
  page: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, total, perPage, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div className="flex items-center justify-between text-sm text-slate-600">
      <span>
        {total === 0 ? "0" : (page - 1) * perPage + 1}–
        {Math.min(page * perPage, total)} из {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="rounded-md border border-slate-200 px-2.5 py-1 disabled:opacity-40 hover:bg-slate-50"
        >
          ‹
        </button>
        <span className="px-2">
          {page} / {pages}
        </span>
        <button
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          className="rounded-md border border-slate-200 px-2.5 py-1 disabled:opacity-40 hover:bg-slate-50"
        >
          ›
        </button>
      </div>
    </div>
  );
}
