import { createContext, useEffect, useState } from "react";

//Context for authentication
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
        if (localStorage.getItem('token')) loadUser(); //if token exists, load user
    }, [])

    //Sign up user
    const signUp = async (user) => { //user is an object with email and password
        return await fetch(`${API}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }

    //Log in user
    const logIn = async (user) => {
        return await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }

    //Load user from server
    const loadUser = async () => {
        const res = await fetch(`${API}/api/auth/get-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        });
        if (!res.ok) { //if token is invalid, set user to null
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