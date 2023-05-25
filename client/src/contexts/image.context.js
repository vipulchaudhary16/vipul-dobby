import { createContext, useContext, useState } from "react";
import { LoaderContext } from "./loader.context";

export const ImageContext = createContext({
    addImage: () => { },
    getAllImages: () => { },
    images: [],
    loadImages: () => { }
})

export const ImageProvider = ({ children }) => {
    const API = process.env.REACT_APP_BACKEND
    const [images, setImages] = useState([])
    const {setIsLoading} = useContext(LoaderContext)

    const addImage = async (data) => {
        return await fetch(API + "/api/image/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data)
        })
    }

    const loadImages = async () => {
        setIsLoading(true)
        const res = await (await getAllImages()).json()
        setImages(res)
        setIsLoading(false)
    }

    const getAllImages = async () => {
        return await fetch(API + "/api/image/get-all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
        })
    }

    const value = {
        addImage,
        getAllImages,
        loadImages,
        images
    }
    return <ImageContext.Provider value={value} >
        {children}
    </ImageContext.Provider>
}