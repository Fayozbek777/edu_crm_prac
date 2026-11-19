import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../model/auth.store";

export function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const setAuth = useAuthStore((s) => s.setAuth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { access, refresh } = await authApi.login({ username, password });
      useAuthStore.setState({ access, refresh });
      const user = await authApi.me();
      setAuth(access, refresh, user);
      navigate(location.state?.from ?? "/dashboard", { replace: true });
    } catch (e: any) {
      setError(
        e.response?.data?.message ??
          e.response?.data?.detail ??
          "Неверный логин или пароль",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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

      <div className="space-y-1.5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Логин
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="username"
            type="text"
            required
            autoFocus
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Пароль
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Вход…" : "Войти"}
      </motion.button>

      <p className="text-sm text-center text-gray-500">
        Нет аккаунта?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
        >
          Регистрация
        </Link>
      </p>
    </form>
  );
}
