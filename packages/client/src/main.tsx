import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

import AdminLayout from "@/layouts/AdminLayout";

import Login from "@/pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import AdminHome from "@/pages/admin/Home";
import AdminAccounts from "@/pages/admin/Accounts";
import AuthProvider from "@/components/auth/AuthProvider";

import UserLayout from "@/layouts/UserLayout";
import UserHome from "@/pages/user/Home";
import RequireAuth from "./components/auth/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: (
          <RequireAuth role="admin">
            <AdminHome />
          </RequireAuth>
        ),
      },
      {
        path: "accounts",
        element: (
          <RequireAuth role="admin">
            <AdminAccounts />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/user",
    Component: UserLayout,
    children: [
      {
        index: true,
        Component: UserHome,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster closeButton position="top-center" />
    </AuthProvider>
  </StrictMode>
);
