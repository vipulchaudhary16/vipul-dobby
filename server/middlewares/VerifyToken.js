const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    //token will be shared in header
    const token = req.header("token");
    //if header does not have token
    if (!token) {
        res.status(401).send({ message: "please pass token" });
        return
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //decoded data from token
        next();
    } catch (error) {
        //invalid token
        res.status(401).send({ error: "Invalid token" });
        console.log(error)
    }
};

module.exports = verifyToken;
