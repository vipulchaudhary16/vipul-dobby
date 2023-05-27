import { createContext, useState } from "react";

//Context for loader
export const LoaderContext = createContext({
    isLoading: false,
    setIsLoading: () => { }
})

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const value = {
        isLoading,
        setIsLoading
    }
    return <LoaderContext.Provider value={value} >
        {children}
    </LoaderContext.Provider>
}