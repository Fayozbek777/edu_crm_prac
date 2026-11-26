# 🎓 Edu CRM — Frontend

| Категория | Технологии |
| :--- | :--- |
| **Core** | `React` • `TypeScript` • `Vite` |
| **Архитектура** | `Feature-Sliced Design (FSD)` |
| **Стейт-менеджмент и запросы** | `Zustand` • `TanStack Query` • `Axios` |
| **Маршрутизация** | `React Router DOM` |
| **Формы и валидация** | `React Hook Form` • `Zod` |
| **Стилизация и UI** | `Tailwind CSS v4` • `shadcn/ui` • `Framer Motion` • `Lucide Icons` • `Sonner` |
| **Утилиты и данные** | `date-fns` • `Usefy Pagination` • `Email-Handler` |
| **Инструменты разработки** | `ESLint` • `npm` • `Git` • `Git Flow` |





<pre>
edu_crm_front/
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
│
├── public/
│   └── vite.svg
│
├── node_modules/
│
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    │
    ├── app/
    │   ├── layouts/
    │   │   ├── AuthLayout.tsx
    │   │   └── MainLayout.tsx
    │   ├── providers/
    │   │   └── AppProviders.tsx
    │   └── router/
    │       ├── guards/
    │       │   └── ProtectedRoute.tsx
    │       └── Router.tsx
    │
    ├── components/
    │   ├── button/
    │   │   └── Button.tsx
    │   ├── footer/
    │   │   └── Footer.tsx
    │   ├── navbar/
    │   │   └── Navbar.tsx
    │   └── sidebar/
    │       └── Sidebar.tsx
    │
    ├── features/
    │   ├── attendance/
    │   │   ├── api/
    │   │   │   └── attendance.api.ts
    │   │   ├── model/
    │   │   │   └── attendance.store.ts
    │   │   ├── types/
    │   │   │   └── attendance.types.ts
    │   │   ├── ui/
    │   │   │   ├── AttendanceCard.tsx
    │   │   │   ├── AttendanceFilters.tsx
    │   │   │   ├── AttendanceForm.tsx
    │   │   │   └── AttendanceTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── auth/
    │   │   ├── api/
    │   │   │   └── auth.api.ts
    │   │   ├── model/
    │   │   │   ├── auth.model.ts
    │   │   │   └── auth.store.ts
    │   │   ├── types/
    │   │   │   └── auth.types.ts
    │   │   ├── ui/
    │   │   │   ├── AuthCard.tsx
    │   │   │   ├── AuthFilters.tsx
    │   │   │   ├── AuthForm.tsx
    │   │   │   └── AuthTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── courses/
    │   │   ├── api/
    │   │   │   └── courses.api.ts
    │   │   ├── model/
    │   │   │   └── courses.store.ts
    │   │   ├── types/
    │   │   │   └── courses.types.ts
    │   │   ├── ui/
    │   │   │   ├── CoursesCard.tsx
    │   │   │   ├── CoursesFilters.tsx
    │   │   │   ├── CoursesForm.tsx
    │   │   │   └── CoursesTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── enrollments/
    │   │   ├── api/
    │   │   │   └── enrollments.api.ts
    │   │   ├── model/
    │   │   │   └── enrollments.store.ts
    │   │   ├── types/
    │   │   │   └── enrollments.types.ts
    │   │   ├── ui/
    │   │   │   ├── EnrollmentsCard.tsx
    │   │   │   ├── EnrollmentsFilters.tsx
    │   │   │   ├── EnrollmentsForm.tsx
    │   │   │   └── EnrollmentsTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── groups/
    │   │   ├── api/
    │   │   │   └── groups.api.ts
    │   │   ├── model/
    │   │   │   └── groups.store.ts
    │   │   ├── types/
    │   │   │   └── groups.types.ts
    │   │   ├── ui/
    │   │   │   ├── GroupsCard.tsx
    │   │   │   ├── GroupsFilters.tsx
    │   │   │   ├── GroupsForm.tsx
    │   │   │   └── GroupsTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── leads/
    │   │   ├── api/
    │   │   │   └── leads.api.ts
    │   │   ├── model/
    │   │   │   └── leads.store.ts
    │   │   ├── types/
    │   │   │   └── leads.types.ts
    │   │   ├── ui/
    │   │   │   ├── LeadsCard.tsx
    │   │   │   ├── LeadsFilters.tsx
    │   │   │   ├── LeadsForm.tsx
    │   │   │   └── LeadsTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── payments/
    │   │   ├── api/
    │   │   │   └── payments.api.ts
    │   │   ├── model/
    │   │   │   └── payments.store.ts
    │   │   ├── types/
    │   │   │   └── payments.types.ts
    │   │   ├── ui/
    │   │   │   ├── PaymentsCard.tsx
    │   │   │   ├── PaymentsFilters.tsx
    │   │   │   ├── PaymentsForm.tsx
    │   │   │   └── PaymentsTable.tsx
    │   │   └── index.ts
    │   │
    │   ├── students/
    │   │   ├── api/
    │   │   │   └── students.api.ts
    │   │   ├── model/
    │   │   │   └── students.store.ts
    │   │   ├── types/
    │   │   │   └── students.types.ts
    │   │   ├── ui/
    │   │   │   ├── StudentsCard.tsx
    │   │   │   ├── StudentsFilters.tsx
    │   │   │   ├── StudentsForm.tsx
    │   │   │   └── StudentsTable.tsx
    │   │   └── index.ts
    │   │
    │   └── teachers/
    │       ├── api/
    │       │   └── teachers.api.ts
    │       ├── model/
    │       │   └── teachers.store.ts
    │       ├── types/
    │       │   └── teachers.types.ts
    │       ├── ui/
    │       │   ├── TeachersCard.tsx
    │       │   ├── TeachersFilters.tsx
    │       │   ├── TeachersForm.tsx
    │       │   └── TeachersTable.tsx
    │       └── index.ts
    │
    ├── pages/
    │   ├── AttendancePage/
    │   │   └── AttendancePage.tsx
    │   ├── CoursesPage/
    │   │   └── CoursesPage.tsx
    │   ├── DashboardPage/
    │   │   └── DashboardPage.tsx
    │   ├── EnrollmentsPage/
    │   │   └── EnrollmentsPage.tsx
    │   ├── GroupsPage/
    │   │   └── GroupsPage.tsx
    │   ├── LeadsPage/
    │   │   └── LeadsPage.tsx
    │   ├── LoginPage/
    │   │   └── LoginPage.tsx
    │   ├── NotFoundPage/
    │   │   └── NotFoundPage.tsx
    │   ├── PaymentsPage/
    │   │   └── PaymentsPage.tsx
    │   ├── RegisterPage/
    │   │   └── RegisterPage.tsx
    │   ├── StudentDetailPage/
    │   │   └── StudentDetailPage.tsx
    │   ├── StudentsPage/
    │   │   └── StudentsPage.tsx
    │   └── TeachersPage/
    │       └── TeachersPage.tsx
    │
    └── shared/
        ├── api/
        │   ├── client.ts
        │   ├── endpoints.ts
        │   ├── queryKeys.ts
        │   └── types.ts
        ├── constants/
        │   ├── roles.ts
        │   └── statuses.ts
        ├── hooks/
        │   ├── useDebounce.ts
        │   ├── usePagination.ts
        │   └── useSearchQuery.ts
        ├── lib/
        │   ├── cn.ts
        │   ├── formatDate.ts
        │   ├── formatMoney.ts
        │   └── formatPhone.ts
        └── ui/
            ├── Button.tsx
            ├── EmptyState.tsx
            ├── ErrorState.tsx
            ├── Input.tsx
            ├── Modal.tsx
            ├── Pagination.tsx
            ├── SearchBar.tsx
            ├── Select.tsx
            ├── Spinner.tsx
            ├── Table.tsx
            └── Toast.tsx
</pre>
