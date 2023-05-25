const mongoose = require("mongoose")

/*
Image
    - name : String
    - image : String
    - userId: string
*/

const Image = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("image", Image)