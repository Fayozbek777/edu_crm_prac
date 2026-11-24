import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./app/providers/QueryProvider";
import "./index.css";
import { router } from "./app/router/Router";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>,
);
