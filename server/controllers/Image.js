const addImage = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getAllImages = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { addImage , getAllImages}