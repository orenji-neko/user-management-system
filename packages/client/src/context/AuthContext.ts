import { createContext } from "react";

export type UserAuth = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
};

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<UserAuth>;
  logout: () => void;
  token: () => string | null;
  verifyAuth: () => Promise<UserAuth>;
} | null>(null);

export default AuthContext;
