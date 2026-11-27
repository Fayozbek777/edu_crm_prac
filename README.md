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
# 📡 API Endpoints — Edu CRM Front

Всего **9 групп API** и **~70 эндпоинтов**. Все пути относительны базовому URL бэкенда.

---

## 🔐 Auth — `/auth/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| POST | `/auth/login/` | Вход |
| GET | `/auth/me/` | Текущий пользователь |
| PUT | `/auth/me/` | Обновление профиля |
| PATCH | `/auth/me/` | Частичное обновление |
| POST | `/auth/refresh/` | Обновление токена |
| POST | `/auth/register/` | Регистрация |
| GET | `/auth/users/` | Список пользователей |
| POST | `/auth/users/` | Создать пользователя |
| GET | `/auth/users/{id}/` | Один пользователь |
| PUT | `/auth/users/{id}/` | Полное обновление |
| PATCH | `/auth/users/{id}/` | Частичное обновление |
| DELETE | `/auth/users/{id}/` | Удалить пользователя |

---

## 👨‍🎓 Students — `/students/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/students/` | Список студентов |
| POST | `/students/` | Добавить студента |
| GET | `/students/{id}/` | Один студент |
| PUT | `/students/{id}/` | Полное обновление |
| DELETE | `/students/{id}/` | Удалить студента |

---

## 👨‍🏫 Teachers — `/teachers/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/teachers/` | Список преподавателей |
| POST | `/teachers/` | Добавить преподавателя |
| GET | `/teachers/{id}/` | Один преподаватель |
| PUT | `/teachers/{id}/` | Полное обновление |
| DELETE | `/teachers/{id}/` | Удалить преподавателя |

---

## 📚 Courses — `/courses/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/courses/` | Список курсов |
| POST | `/courses/` | Создать курс |
| GET | `/courses/{id}/` | Один курс |
| PUT | `/courses/{id}/` | Полное обновление |
| PATCH | `/courses/{id}/` | Частичное обновление |
| DELETE | `/courses/{id}/` | Удалить курс |

---

## 👥 Groups — `/groups/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/groups/` | Список групп |
| POST | `/groups/` | Создать группу |
| GET | `/groups/{id}/` | Одна группа |
| PUT | `/groups/{id}/` | Полное обновление |
| PATCH | `/groups/{id}/` | Частичное обновление |
| DELETE | `/groups/{id}/` | Удалить группу |

---

## 📝 Enrollments — `/enrollments/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/enrollments/` | Список записей |
| POST | `/enrollments/` | Создать запись |
| GET | `/enrollments/{id}/` | Одна запись |
| PUT | `/enrollments/{id}/` | Полное обновление |
| PATCH | `/enrollments/{id}/` | Частичное обновление |
| DELETE | `/enrollments/{id}/` | Удалить запись |

---

## 💰 Payments — `/payments/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/payments/` | Список платежей |
| POST | `/payments/` | Записать платёж |
| GET | `/payments/{id}/` | Один платёж |
| PUT | `/payments/{id}/` | Полное обновление |
| PATCH | `/payments/{id}/` | Частичное обновление |
| DELETE | `/payments/{id}/` | Удалить платёж |

---

## 📊 Attendance — `/attendance/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/attendance/` | Список посещаемости |
| POST | `/attendance/` | Отметить посещаемость |
| GET | `/attendance/{id}/` | Одна запись |
| PUT | `/attendance/{id}/` | Полное обновление |
| PATCH | `/attendance/{id}/` | Частичное обновление |
| DELETE | `/attendance/{id}/` | Удалить запись |

---

## 🎯 Leads — `/leads/`

| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/leads/` | Список лидов |
| POST | `/leads/` | Создать лид |
| GET | `/leads/{id}/` | Один лид |
| PUT | `/leads/{id}/` | Полное обновление |
| PATCH | `/leads/{id}/` | Частичное обновление |
| DELETE | `/leads/{id}/` | Удалить лид |

---
