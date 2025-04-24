import { useEffect } from "react";
import { Link, Outlet } from "react-router";

const navLinks = [
    {
        path: "/admin/accounts",
        label: "Accounts",
    }
]

export default function AdminLayout() {

    return (
        <div className="w-screen h-screen">
            <nav className="w-full shadow p-4">
                <div>
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path}>{link.label}</Link>
                    ))}
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}