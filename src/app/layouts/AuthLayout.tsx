// src/app/layouts/AuthLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useAuthStore } from "../../features/auth/model/auth.store";

export function AuthLayout() {
  const isAuth = useAuthStore((s) => !!s.access);
  if (isAuth) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-3 sm:px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white mb-3 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            EduCRM
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление учебным центром
          </p>
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
}
