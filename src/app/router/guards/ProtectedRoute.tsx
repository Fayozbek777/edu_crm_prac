import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../../../features/auth/model/auth.store";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const access = useAuthStore((s) => s.access);
  const location = useLocation();

  if (!access) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return <>{children}</>;
}
