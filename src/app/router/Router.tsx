// src/app/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./guards/ProtectedRoute";

import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import { StudentsPage } from "../../pages/StudentsPage/StudentsPage";
import CoursesPage from "../../pages/CoursesPage/CoursesPage";
import TeachersPage from "../../pages/TeachersPage/TeachersPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/students", element: <StudentsPage /> }, // ✅ добавлено
      { path: "/courses", element: <CoursesPage /> }, // ✅ добавлено
      { path: "/teachers", element: <TeachersPage /> }, // ✅ добавлено
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <p className="text-6xl font-bold text-gray-300 mb-2">404</p>
        <p className="text-gray-600 mb-6">Страница не найдена</p>
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          На главную
        </a>
      </div>
    ),
  },
]);
