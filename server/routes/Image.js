const express = require('express')
const verifyToken = require('../middlewares/VerifyToken')
const { getAllImages, addImage } = require('../controllers/Image')
const router = express.Router()

router.post("/add", verifyToken, addImage) //add image route
router.get("/get-all", verifyToken, getAllImages) //get all images route

module.exports = router