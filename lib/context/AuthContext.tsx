import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

export type UserType = User | null;

export type AuthContextProps = {
    user: UserType;
};

export type AuthProps = {
    children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProps) => {
    const router = useRouter();
    const [user, setUser] = useState<UserType>(null);
    const isAvailableForViewing =
        router.pathname === "/Login" ||
        router.pathname === "/SignUp";
    const value = {
        user, 
    }

    useEffect(() => {
        const authStateChanged = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            !user && isAvailableForViewing && (await router.push('/login'))
        } )
        return () => {
            authStateChanged();
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}