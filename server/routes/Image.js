const express = require('express')
const verifyToken = require('../middlewares/VerifyToken')
const { getAllImages, addImage } = require('../controllers/Image')
const router = express.Router()

router.post("/add", verifyToken, addImage)
router.get("/get-all", verifyToken, getAllImages)

module.exports = router