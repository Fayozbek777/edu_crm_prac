import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { authApi } from "../api/auth.api";

const inputBase =
  "w-full border border-gray-300 rounded-lg py-2.5 text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";
const labelBase = "block text-sm font-medium text-gray-700 mb-1.5";
const iconBase =
  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none";

export function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.password2) {
      setError("Пароли не совпадают");
      return;
    }
    setLoading(true);
    try {
      await authApi.register(form);
      navigate("/login", { replace: true });
    } catch (e: any) {
      const data = e.response?.data;
      const firstError =
        (data?.details && (Object.values(data.details)[0] as string[])?.[0]) ||
        data?.message ||
        "Ошибка регистрации";
      setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="first_name" className={labelBase}>
            Имя
          </label>
          <div className="relative">
            <User className={iconBase} />
            <input
              id="first_name"
              name="first_name"
              required
              autoComplete="given-name"
              placeholder="Имя"
              value={form.first_name}
              onChange={onChange}
              className={`${inputBase} pl-9 pr-3`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="last_name" className={labelBase}>
            Фамилия
          </label>
          <div className="relative">
            <User className={iconBase} />
            <input
              id="last_name"
              name="last_name"
              required
              autoComplete="family-name"
              placeholder="Фамилия"
              value={form.last_name}
              onChange={onChange}
              className={`${inputBase} pl-9 pr-3`}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="username" className={labelBase}>
          Логин
        </label>
        <div className="relative">
          <AtSign className={iconBase} />
          <input
            id="username"
            name="username"
            required
            autoComplete="username"
            placeholder="Введите логин"
            value={form.username}
            onChange={onChange}
            className={`${inputBase} pl-9 pr-3`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelBase}>
          Email
        </label>
        <div className="relative">
          <AtSign className={iconBase} />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            className={`${inputBase} pl-9 pr-3`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelBase}>
          Телефон
        </label>
        <div className="relative">
          <Phone className={iconBase} />
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+998901234567"
            value={form.phone}
            onChange={onChange}
            className={`${inputBase} pl-9 pr-3`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={labelBase}>
          Пароль
        </label>
        <div className="relative">
          <Lock className={iconBase} />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Введите пароль"
            value={form.password}
            onChange={onChange}
            className={`${inputBase} pl-9 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="password2" className={labelBase}>
          Повторите пароль
        </label>
        <div className="relative">
          <Lock className={iconBase} />
          <input
            id="password2"
            name="password2"
            type={showPassword2 ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Повторите пароль"
            value={form.password2}
            onChange={onChange}
            className={`${inputBase} pl-9 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword2((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword2 ? "Скрыть пароль" : "Показать пароль"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {showPassword2 ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <UserPlus className="w-4 h-4" />
        )}
        {loading ? "Создаём…" : "Зарегистрироваться"}
      </motion.button>

      <p className="text-sm text-center text-gray-500">
        Уже есть аккаунт?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
        >
          Войти
        </Link>
      </p>
    </form>
  );
}
