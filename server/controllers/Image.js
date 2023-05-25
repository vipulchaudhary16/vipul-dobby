const cloudinary = require("cloudinary").v2;
const Image = require("../models/Image")
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result?.secure_url) {
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};

const addImage = async (req, res) => {
    try {
        const url = await uploadImage(req.body.image)
        const imageDoc = new Image({
            name: req.body.name,
            image: url,
            userId: req.user.userId
        })
        await imageDoc.save()
        res.json({
            message: "Image added"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getAllImages = async (req, res) => {
    try {
        const { userId } = req.user
        const images = await Image.find({ userId }, { userId: false })
        res.json(images)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { addImage, getAllImages }