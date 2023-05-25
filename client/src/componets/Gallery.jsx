import React, { useContext, useEffect, useState } from 'react'
import { ImageContext } from '../contexts/image.context'
import { ImageCard } from './ImageCard'
import "../styles/Gallery.css"

export const Gallery = () => {
    const { images, loadImages } = useContext(ImageContext)

    useEffect(() => {
        loadImages()
    }, [])
    return (
        <div className='gallery-container'>
            <h2>Your Images</h2>
            <div className="gallery">
                {
                    images.length > 0 && images.map((data) => {
                        return <ImageCard data={data} key={data._id} />
                    })
                }
            </div>
        </div>
    )
}
