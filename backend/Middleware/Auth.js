const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers['authorization'];

    if(!auth){
        return res.status(400).json({message: 'Unauthorized, JWT token is require'});
    }

    try {
        const decode = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(500).json({message: 'Unauthorized, JWT token is require'});
    }
}

module.exports = ensureAuthenticated;