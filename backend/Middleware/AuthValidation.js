const Joi = require("joi");
const { schema } = require("../Models/User");


const signupValidation = (req,res,next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().required(),
        password: Joi.string().min(4).max(16).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(500).json({
            message: "Bod Request", error
        });
    }

    next();
}

const loginValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(4).max(16).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(500).json({
            message: "Bod Request", error
        });
    }

    next();
}

module.exports = {
    signupValidation,
    loginValidation
}