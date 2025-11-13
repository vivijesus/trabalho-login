import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import type { User } from "../../types/User";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const [UserCadastroUser, setCadastroUser] = useState<any | null>(null);
    
    
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                return true;
            }
        }
        validateToken();
    }, [api]);

    const signin = async (email: string, senha: string) => {
        const data = await api.signin(email, senha);
        
        if (data) {
            setUser({ 'token': data.token, 'controle': data.controle });
            setToken(data.token);
            return true;
        }
        return false;
    }

    const cadastroUser = async (data: any) => {
        const response = await api.cadastroUser(data);

        if (response) {
            setCadastroUser(response);
            return true;
        }        
        return false;
    } 

    const usuarioList = async () => {
        const response = await api.usuarioList();

        if (response) {
            return response;
        }        
        return [];
    }
    
    const signout = async () => {
        console.log("signout está sendo executada.");
        setUser(null);
        await clearToken();
        //await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const clearToken = () => {
        localStorage.removeItem('authToken')
    }

    return (
        <AuthContext.Provider value={{ user, cadastroUser, usuarioList, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}