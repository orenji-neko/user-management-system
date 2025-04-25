import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import './index.css'

import AdminLayout from '@/layouts/AdminLayout';

import Login from "@/pages/Login";
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import AdminHome from './pages/admin/Home';
import AdminAccounts from "@/pages/admin/Accounts";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Login
    },
    {
        path: "*",
        Component: NotFound,
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/admin",
        Component: AdminLayout,
        children: [
            {
                index: true,
                Component: AdminHome,
            },
            {
                path: "accounts",
                Component: AdminAccounts
            }
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
        <Toaster closeButton position="top-center" />
    </StrictMode>,
)
