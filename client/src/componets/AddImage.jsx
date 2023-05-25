import React, { useContext, useState } from 'react'
import { ImageContext } from '../contexts/image.context';
import { LoaderContext } from '../contexts/loader.context';
import "../styles/AddImage.css"
import { ImageCard } from './ImageCard';

export const AddImage = () => {
    const [data, setData] = useState({
        name: "",
        image: ""
    })
    const [previewImage, setPreviewImage] = useState(null);


    const { addImage, loadImages } = useContext(ImageContext)
    const { setIsLoading } = useContext(LoaderContext)

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleChange = (e) => {
        if (e.target.name == 'image') {
            setData({ ...data, ["image"]: e.target.files[0] })
            const selectedImage = e.target.files[0];
            setData({ ...data, ["image"]: selectedImage });
            const imagePreviewURL = URL.createObjectURL(selectedImage);
            setPreviewImage({ ...previewImage, image: imagePreviewURL });
        } else {
            setData({ ...data, [e.target.name]: e.target.value })
            setPreviewImage({ ...previewImage, name: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const base64 = await convertBase64(data.image)
        const res = await addImage({ name: data.name, image: base64 })
        if (!res.ok) {
            alert("Something went wrong")
        }
        setIsLoading(false)
        loadImages()
    }

    return (
        <div className='add-image-form-container'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Add new image</h3>
                <div className="input-container">
                    <label htmlFor="image">Image</label>
                    <input type="file" name='image' id='image' onChange={(e) => handleChange(e)} required accept=".jpg, .jpeg, .png" />
                </div>
                <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' onChange={(e) => handleChange(e)} required />
                </div>
                <button type='submit' className='add-image-btn'>Add</button>
            </form>
            <div className="preview">
                <h3>Preview</h3>
                {previewImage ? <ImageCard data={previewImage} /> : <label htmlFor="image">Select Image</label>

                }
            </div>
        </div>
    )
}
