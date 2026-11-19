import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  ShieldCheck,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/model/auth.store";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" },
  }),
};

const navItems = [
  { label: "Дашборд", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Пользователи", icon: Users, href: "/users" },
  { label: "Настройки", icon: Settings, href: "/settings" },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
      user.username
    : "";

  const initials = user
    ? (user.first_name?.[0] ?? user.username?.[0] ?? "?").toUpperCase()
    : "?";

  const cards = [
    { label: "Роль", value: user?.role ?? "—", icon: ShieldCheck },
    { label: "Телефон", value: user?.phone || "—", icon: Phone },
    { label: "Email", value: user?.email || "—", icon: Mail },
  ];

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* === Header === */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="container-responsive flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-3 min-w-0">
            {/* Burger — только на мобильных */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
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
          </div>
        </div>
      </header>

      <div className="container-responsive flex gap-6 py-5 sm:py-6">
        {/* === Mobile drawer === */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMenuOpen(false)}
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
                  <span className="font-semibold text-gray-900">Меню</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Закрыть меню"
                    className="p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          item.active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </a>
                    );
                  })}
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
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout?.();
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
        <main className="flex-1 min-w-0 space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-1"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Дашборд
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Добро пожаловать{displayName ? `, ${displayName}` : ""}!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -2 }}
                  className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow"
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </span>
                    <p className="text-sm">{card.label}</p>
                  </div>
                  <p className="text-base sm:text-lg font-semibold mt-3 truncate text-gray-900">
                    {card.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
