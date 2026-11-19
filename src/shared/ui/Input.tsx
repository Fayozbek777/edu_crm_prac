import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  ...rest
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <input
        {...rest}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition
          placeholder:text-slate-400
          ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-slate-900"}
          ${className}`}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
