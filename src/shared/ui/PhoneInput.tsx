// src/shared/ui/PhoneInput.tsx
import { extractPhoneDigits, formatUzPhoneDigits } from "../lib/formatPhone";

interface Props {
  value: string; // хранит 9 цифр, например "555555555"
  onChange: (digits: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "55 555 55 55",
  required,
  className,
}: Props) {
  const digits = extractPhoneDigits(value);
  const display = formatUzPhoneDigits(digits);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // из введённой строки достаём только цифры после +998
    onChange(extractPhoneDigits(e.target.value));
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 select-none">
        +998
      </span>
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        required={required}
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-14 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-[var(--color-primary)] focus:outline-none"
      />
    </div>
  );
}
