// src/components/navbar/Navbar.tsx
import { Menu, X, LogOut, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../features/auth/model/auth.store";

interface NavbarProps {
  onBurgerClick?: () => void;
  menuOpen?: boolean;
  onLogout?: () => void;
  title?: string;
}

export function Navbar({
  onBurgerClick,
  menuOpen,
  onLogout,
  title,
}: NavbarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() ||
    user?.username ||
    "";

  const initials = (
    user?.first_name?.[0] ??
    user?.username?.[0] ??
    "?"
  ).toUpperCase();

  const handleLogout = () => {
    if (onLogout) onLogout();
    else logout?.();
  };

  return (
    <header className="sticky top-0 z-40 h-14 sm:h-16 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onBurgerClick && (
            <button
              onClick={onBurgerClick}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
          <span className="text-base sm:text-lg font-bold text-gray-900 truncate">
            {title ?? "EduCRM"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            aria-label="Уведомления"
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="hidden sm:block text-right min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
              {displayName || "—"}
            </p>
            {user?.role && (
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            )}
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {initials}
          </div>

          <button
            onClick={handleLogout}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
}
