import userModel from "../models/userModel.js"; //yahn p .js ka dhyaan rkha kro
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User doesn't exist"})
        }

        // mtlb user h aur wo mil bhi gya h
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.json({success: false, message:"Invalid credentials"})
        }
        // user ka password verify hogya h aur ab wo verified h
        // user verified h to usko token dediya ek
        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error);        
        res.json({success: false, message: "Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        // Check for if user already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message: "User already exists"})
        }

        // yahan aagye mtlb user naya hi aaya h
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message: "Please enter a strong password"})
        }

        // yahan aagye mtlb email password theek h ab usko create krna h naya account
        // hashing user password
        const salt = await bcrypt.genSalt(10) //add a number between 5-15
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        // user created and save it now
        const user = await newUser.save()
        const token = createToken(user._id)
        return res.json({success: true, token});

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export{
    loginUser,
    registerUser
}