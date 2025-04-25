import { useState, useEffect, use } from "react";
import AuthContext, { UserAuth } from "@/context/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserAuth | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      const { token, user } = data as { token: string; user: UserAuth };
      setUser(user);
      localStorage.setItem("token", token);

      return user;
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const verifyAuth = async () => {
    const response = await fetch("/api/verify-authentication", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Login failed");
    }

    const result = (await response.json()) as UserAuth;
    return result;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetch("/api/verify-authentication", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Token invalid");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.error("Auto-login failed:", err);
          logout();
        });
    }
  }, []);

  const token = () => localStorage.getItem("token");

  const value = {
    user,
    login,
    logout,
    token,
    verifyAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
