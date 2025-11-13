import { createContext } from "react";
import type { User } from "../../types/User";

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    usuarioList: () => Promise<any>;
    signout: () => void;
    cadastroUser: (data: any) => Promise<any>;

}

export const AuthContext = createContext<AuthContextType>(null!);