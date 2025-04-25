import { useEffect } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "../components/ui/button";

const navLinks = [
    {
        path: "/user",
        label: "Home"
    },
]

export default function UserLayout() {

    return (
        <div className="w-screen h-screen">
            <nav className="w-full shadow p-4">
                <div className="w-full flex flex-row gap-2 justify-center">
                    {navLinks.map((link) => (
                        <Button variant="ghost" key={link.path}>
                            <Link to={link.path}>{link.label}</Link>
                        </Button>
                    ))}
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}