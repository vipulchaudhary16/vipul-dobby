import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    signUp: () => { },
    logIn: () => { },
    user: null,
    loadUser: () => { }
})

export const AuthProvider = ({ children }) => {
    const API = process.env.REACT_APP_BACKEND
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')) loadUser();
    }, [])


    const signUp = async (user) => {
        return await fetch(`${API}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }

    const logIn = async (user) => {
        return await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }

    const loadUser = async () => {
        const res = await fetch(`${API}/api/auth/get-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        });
        if (!res.ok) {
            setUser(null)
            return
        }
        setUser(await res.json())
    }

    const value = { signUp, logIn, loadUser, user }
    return <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>
}