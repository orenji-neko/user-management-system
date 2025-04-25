import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {

  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new TypeError("useAuth must be used within an AuthProvider");
  }
  return ctx;
}