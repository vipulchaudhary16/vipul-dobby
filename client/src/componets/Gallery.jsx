import React, { useContext, useEffect, useState } from 'react'
import { ImageContext } from '../contexts/image.context'
import { ImageCard } from './ImageCard'
import "../styles/Gallery.css"
import { AuthContext } from '../contexts/auth.context'

export const Gallery = () => {
    const { images, loadImages } = useContext(ImageContext)
    const { user } = useContext(AuthContext)
    const [res, setRes] = useState([]) //resultant images after search

    useEffect(() => {
        setRes(images)
    }, [images]) //whenever images changes resultant images will be updated

    useEffect(() => {
        //image fetching will be called only when user is logged in
        user && loadImages()
    }, [user]) //whenever user changes fetching will be called

    //filter images based on name
    const filterImage = (e) => {
        const name = e.target.value
        const result = images.filter(image => image.name.toLowerCase().includes(name.toLowerCase().trim()))
        setRes(result)
    }

    return (
        <div className='gallery-container'>
            <h2>Your Images</h2>
            <div className="search-container">
                <span>Search Image </span>
                <input type="text" onChange={(e) => filterImage(e)} placeholder='Enter name' />
            </div>
            <div className="gallery">
                {
                    res.length > 0 && res.map((data) => {
                        return <ImageCard data={data} key={data._id} />
                    })
                }
            </div>
            {
                res.length == 0 && <p className='notification'>
                    No Image found
                </p>
            }
        </div>
    )
}
