const mongoose = require("mongoose")

/*
User
    - name : String
    - email : String
    - password : String
*/

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("users", User)