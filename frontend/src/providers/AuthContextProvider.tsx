import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    user: any,
    setUser: any,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode}) => {
    const initialUser : any = Cookies.get('user');

    const [user, setUser] = useState(initialUser);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
