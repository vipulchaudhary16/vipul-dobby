const express = require('express')
const { signUp, logIn, getUser } = require('../controllers/Auth')
const verifyToken = require('../middlewares/VerifyToken')
const router = express.Router()

router.post("/signup", signUp) //signup route
router.post("/login", logIn) //login route
router.get("/get-user", verifyToken, getUser) //get user route

module.exports = router