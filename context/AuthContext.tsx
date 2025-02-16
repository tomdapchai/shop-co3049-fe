"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Login, Register } from "@/services/AuthService";
import Cookies from "js-cookie";
import { set } from "zod";
import { User } from "@/types";
import { getUserById } from "@/services/UserService";
import { log } from "console";
interface AuthContextProps {
    isAdmin: boolean;
    isLoggedIn: boolean;
    userId: string;
    user: User | null;
    error: string | null;
    loginUser: (
        username: string,
        password: string
    ) => Promise<{ message: string } | { error: string }>;
    loginAdmin: (
        username: string,
        password: string
    ) => Promise<{ message: string } | { error: string }>;
    logoutUser: () => Promise<void>;
    logoutAdmin: () => Promise<void>;
    register: (
        username: string,
        password: string
    ) => Promise<{ message: string } | { error: string }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

const COOKIE_NAME = "authUser";
const COOKIE_OPTIONS = {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
};

const COOKIE_NAME_ADMIN = "adminData";
const COOKIE_OPTIONS_ADMIN = {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/admin",
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // gonna take all user info once logged in, for better user experience
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("1");
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const storedUserId = Cookies.get(COOKIE_NAME);
        const storeAdmin = Cookies.get(COOKIE_NAME_ADMIN);
        if (storeAdmin) {
            setIsAdmin(true);
        }
        if (storedUserId) {
            setUserId(storedUserId);
            setIsLoggedIn(true);
        }
        setIsInitialized(true);
    }, []);

    // Update cookie whenever the authentication state changes
    const updateAuthState = (newUserId: string, isLoggedIn: boolean) => {
        if (isLoggedIn) {
            Cookies.set(COOKIE_NAME, newUserId, COOKIE_OPTIONS);
        } else {
            Cookies.remove(COOKIE_NAME, { path: "/" });
        }
        setUserId(newUserId);
        setIsLoggedIn(isLoggedIn);
    };

    useEffect(() => {
        if (isLoggedIn) {
            // Fetch user info
            // getUserById(userId).then((response) => {
            //     if ("error" in response) {
            //         setError(response.error);
            //     } else {
            //         setUser(response);
            //     }
            // });
            getUserById(userId).then((res) => {
                if ("error" in res) {
                    setError(res.error);
                } else {
                    console.log("User:", res);
                    setUser(res);
                }
            });
        }
    }, [isLoggedIn]);

    const loginUser = async (
        username: string,
        password: string
    ): Promise<{ message: string } | { error: string }> => {
        const response = await Login(username, password);
        if (response.status === "error") {
            setError(response.message);
            return { error: response.message };
        }
        updateAuthState(response.userId, true);
        setError(null);
        return { message: response.message };
    };

    const logoutUser = async (): Promise<void> => {
        updateAuthState("", false);
        setError(null);
    };

    const loginAdmin = async (
        username: string,
        password: string
    ): Promise<{ message: string } | { error: string }> => {
        // await login({ email: username, password }, "admin");

        // below is testing phase
        if (username === "admin" && password === "password") {
            /* setIsLoggedIn(true);
            setUserId(userId); */
            setIsAdmin(true);
            Cookies.set(COOKIE_NAME_ADMIN, "admin", COOKIE_OPTIONS_ADMIN);
            return { message: "Admin logged in" };
        } else {
            setError("Invalid credentials");
            return { error: "Invalid credentials" };
        }
    };

    const logoutAdmin = async (): Promise<void> => {
        setIsAdmin(false);
        Cookies.remove(COOKIE_NAME_ADMIN, { path: "/admin" });
    };

    const register = async (
        username: string,
        password: string
    ): Promise<{ message: string } | { error: string }> => {
        const response = await Register(username, password);
        if (response.status === "error") {
            setError(response.message);
            return { error: response.message };
        }
        setError(null);
        updateAuthState(userId, true);
        return { message: response.message };
        //setUserId(username);
    };

    if (!isInitialized) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                isLoggedIn,
                userId,
                error,
                user,
                loginUser,
                logoutUser,
                loginAdmin,
                logoutAdmin,
                register,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
