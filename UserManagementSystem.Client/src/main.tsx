import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";

import './index.css'

import Accounts from "@/pages/admin/Accounts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Nothing to see here</p>
    },
    {
        path: "/admin/accounts",
        element: <Accounts/>
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
