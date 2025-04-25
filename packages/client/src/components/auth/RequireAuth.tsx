import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "user" | "admin";
}) {
  const navigate = useNavigate();
  const { verifyAuth } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        const user = await verifyAuth();
        if (role && user?.role !== role) {
          navigate("/");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        navigate("/");
      }
    };

    verify();
  }, [navigate, role, verifyAuth]);

  return <div>{children}</div>;
}
