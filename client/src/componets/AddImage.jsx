import React, { useContext, useRef, useState } from 'react'
import { ImageContext } from '../contexts/image.context';
import { LoaderContext } from '../contexts/loader.context';
import { AuthContext } from '../contexts/auth.context';
import "../styles/AddImage.css"
import { ImageCard } from './ImageCard';
import { useNavigate } from 'react-router-dom';

export const AddImage = () => {
    const [data, setData] = useState({
        name: "",
        image: null
    }) //data for form fields values
    const [previewImage, setPreviewImage] = useState(null); //previewImage 
    const imageRef = useRef(null); //reference to image input field
    const navigate = useNavigate() 

    const { addImage, loadImages } = useContext(ImageContext)
    const { setIsLoading } = useContext(LoaderContext)
    const { user } = useContext(AuthContext)

    //convert image to base64 format to store in database
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

    //handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'image') { //if image is selected, we will show preview of image
            const selectedImage = e.target.files[0];
            setData({ ...data, [name]: selectedImage });
            setPreviewImage({ ...previewImage, image: URL.createObjectURL(selectedImage) });
            return;
        }
        setData({ ...data, [name]: value })
    }

    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) { //if user is not logged in, we will redirect to login page
            alert("Please login to add image")
            navigate("/login")
            return
        }
        setIsLoading(true)
        const base64 = await convertBase64(data.image)
        const res = await addImage({ name: data.name, image: base64 })
        if (!res.ok) { //if image is not added successfully, we will show error message
            alert("Something went wrong")
        }
        setIsLoading(false)
        loadImages() //load images again to show newly added image
        setData({ name: "", image: ""}) //reset form
        imageRef.current.value = null //reset image input field
        setPreviewImage(null) //reset preview image
    }

    return (
        <div className='add-image-form-container'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Add new image</h3>
                <div className="input-container">
                    <label htmlFor="image">Image</label>
                    <input type="file" name='image' id='image' ref={imageRef} onChange={(e) => handleChange(e)} required accept=".jpg, .jpeg, .png" />
                </div>
                <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' value={data.name} onChange={(e) => handleChange(e)} required />
                </div>
                <button type='submit' className='add-image-btn'>Add</button>
            </form>
            <div className="preview">
                <h3>Preview</h3>
                {previewImage ? <ImageCard data={previewImage} /> : <label htmlFor="image">Click here to select Image</label>

                }
            </div>
        </div>
    )
}
