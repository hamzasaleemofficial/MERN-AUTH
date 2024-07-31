const ensureAuthenticated = require("../Middleware/Auth");


const router = require('express').Router();

router.get('/', ensureAuthenticated, (req,res) => {
    console.log("loggedin user details", req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: "150k"
        },
        {
            name: "laptop",
            price: "200k"
        }
    ]);
})

module.exports = router