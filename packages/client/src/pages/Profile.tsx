import { UserAuth } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<UserAuth | null>();
  const { verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [verifyAuth]);

  return (
    <>
      <p>Profile</p>
      <p>{user?.email}</p>
    </>
  );
}
