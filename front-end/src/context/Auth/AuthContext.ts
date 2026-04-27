import { createContext, useContext } from "react";

interface AuthContextType {
    email: string | null;
    token: string | null;
    login: ( email: string, token: string) => void;
    isAuthenticated: boolean | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({ email: null, token: null, login: () => {} , isAuthenticated: null, logout: () => {} })

const useAuth = () => useContext(AuthContext);
export default useAuth;