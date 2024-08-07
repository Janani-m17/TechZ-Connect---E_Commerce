const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async(req,res) => {
    
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(404).json("Invalid Email or Password")

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json("Invalid Email or Password")

        const token = jwt.sign({user_id : user._id}, 'secret_token',{
            expiresIn: "1h",
        })
        return res.status(200).json(token);
    }
    catch(error){
        console.log(error)
    }
}

exports.signUp = async(req,res) => {
    
    try{
        const {name,email,password} = req.body;
        const user = new User({
            name,
            email,
            password
        })
        await user.save();
        res.status(200).json("User Created Successfully")
    }
    catch(error){
        console.log(error);
        res.status(500).json("Can't create user");
    }
}


