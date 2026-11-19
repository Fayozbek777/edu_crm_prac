import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
};

export default function SearchBar({
  value,
  onChange,
  onClear,
  ...rest
}: Props) {
  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        ⌕
      </span>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 py-2 text-sm
          outline-none placeholder:text-slate-400 focus:border-slate-900"
        placeholder="Поиск..."
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
