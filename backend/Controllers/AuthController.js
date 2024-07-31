const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModal = require("../Models/User");



const signup = async(req,res) => {

    try {

        const {username, email, password} = req.body;
    const user = await userModal.findOne({email});
    if(user){
        return res.status(400).json({message: "User is already exist, you can't login", success: false});
        
    }

    const userModel = new userModal({username, email,password});
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(200).json({
        message: "Signup Successfully", 
        success: true
    })

    } catch (error) {
        res.status(500).json({
                message: "Internal Server Error", 
                success: false
            })
    }
}


    const login = async(req,res) => {
        try {

            const {email, password} = req.body;
            const user = await userModal.findOne({email});
            const errorMessage = "Auth failed email or password is wrong";
            if(!user){
                return res.status(404).json({message: errorMessage, success: false});
            }
            const isPassEqual = await bcrypt.compare(password, user.password);
            if(!isPassEqual){
                res.status(404).json({message: errorMessage, success: false});
            }
               const jwtToken = jwt.sign(
                {email: user.email, _id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
               )
               res.status(200).json({
                message: "Login Successfully", 
                success: true, 
                token: jwtToken, 
                email, 
                name: user.username
            });




        } catch (error) {
            res.status(500).json({message: "Internal Server Error", success: false});
        }
    }

module.exports = {
    signup,
    login
}