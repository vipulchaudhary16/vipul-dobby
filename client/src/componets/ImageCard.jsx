import React from 'react'
import "../styles/ImageCard.css"

export const ImageCard = ({ data }) => {
    const { image, name } = data
    return (
        <div className='image-card'>
            <div className="image-container">
            <img src={image} alt={name} />
            </div>
            <p>{name}</p>
        </div>
    )
}
