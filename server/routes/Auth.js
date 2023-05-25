const express = require('express')
const { signUp, logIn, getUser } = require('../controllers/Auth')
const verifyToken = require('../middlewares/VerifyToken')
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/get-user", verifyToken, getUser)


module.exports = router