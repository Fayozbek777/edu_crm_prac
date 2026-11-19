// src/app/layouts/MainLayout.tsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  ClipboardList,
  CreditCard,
  CalendarCheck,
  Target,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/model/auth.store";

const NAV = [
  { to: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { to: "/students", label: "Студенты", icon: GraduationCap },
  { to: "/teachers", label: "Преподаватели", icon: Users },
  { to: "/courses", label: "Курсы", icon: BookOpen },
  { to: "/groups", label: "Группы", icon: Layers },
  { to: "/enrollments", label: "Записи", icon: ClipboardList },
  { to: "/payments", label: "Платежи", icon: CreditCard },
  { to: "/attendance", label: "Посещаемость", icon: CalendarCheck },
  { to: "/leads", label: "Лиды", icon: Target },
];

export function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() ||
    user?.username ||
    "";

  const initials = (
    user?.first_name?.[0] ??
    user?.username?.[0] ??
    "?"
  ).toUpperCase();

  const NavItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="truncate">{label}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-gray-50">
      {/* === Header === */}
      <header className="sticky top-0 z-40 h-14 sm:h-16 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-base sm:text-lg font-bold text-gray-900 truncate">
              EduCRM
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
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
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* === Sidebar (desktop) === */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200">
          <nav className="flex flex-col gap-1 p-3 sticky top-16">
            <NavItems />
          </nav>
        </aside>

        {/* === Mobile drawer === */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[80%] max-w-xs bg-white shadow-xl flex flex-col"
              >
                <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">EduCRM</span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Закрыть меню"
                    className="p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
                  <NavItems onNavigate={() => setOpen(false)} />
                </nav>

                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {displayName || "—"}
                      </p>
                      {user?.role && (
                        <p className="text-xs text-gray-500 truncate">
                          {user.role}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Выйти
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* === Main === */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
