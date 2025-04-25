import { createContext } from "react";

export type UserAuth = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

const AuthContext = createContext<{
  user: UserAuth | null;
  login: (email: string, password: string) => Promise<UserAuth>;
  logout: () => void;
  token: () => string | null;
  verifyAuth: () => Promise<UserAuth>;
} | null>(null);

export default AuthContext;
