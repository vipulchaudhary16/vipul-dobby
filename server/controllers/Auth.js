const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET

const signUp = async (req, res) => {
    try {
        //find if email is already in use or not 
        const user = await User.findOne({ email: req.body.email });
        if (user != null) { //if email already exists
            res.status(400).json({ message: "Email Already Exists" });
            return;
        }
        const { name, email, password } = req.body
        console.log(name, email, password)
        //password hashing
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        //create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        //save user into db
        await newUser.save()
        res.status(200).json({ message: "Account created" })
    } catch (error) {
        //internal server error
        res.status(500).json({ 'message': "Internal Server error" })
        console.log(error)
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        //check if user exist or not
        const user = await User.findOne({ email })
        if (user) { //if user exists
            const compareResult = await bcrypt.compare(password, user.password)
            if (compareResult) {
                //create payload for token
                const payload = {
                    user: {
                        userId: user._id,
                        email,
                    }
                }
                //sign token with payload
                const token = jwt.sign(payload, SECRET)
                res.status(200).json({ 'message': "Logged In Success", token })
            } else {
                //wrong password
                res.status(400).json({ 'message': "Wrong credentials" })
            }
        } else {
            //no user found
            res.status(400).json({ 'message': 'User does not exists' })
        }
    } catch (error) {
        //internal server error
        res.status(500).json({ 'message': "Internal Server error" })
        console.log(error)
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.user
        const user = await User.findById(userId, { password: false, _id: false })
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "User does not exists" })
        }
    } catch (error) {
        //internal server error
        res.status(500).json({ 'message': "Internal Server error" })
        console.log(error)
    }
}

module.exports = { signUp, logIn, getUser }