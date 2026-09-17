import usermodel from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import blacklistModel from "../model/Blacklist.model.js";
import authMiddleware from "../middleware/auth.middleware.js";


const RegisterUser=async(req,res)=>{
    const {username,email,password}=req.body;

    if (!username||!email||!password) {
        return res.status(400).json({
            message:"Please Provide Username,email and password"
        })
    }

    const isUserExists=await usermodel.findOne({
        $or:[{ username },{ email }]
    })

    if (isUserExists) {
        return res.status(400).json({
            message:"Account already exist with this username and email"
        })
    }

    const hash=await bcrypt.hash(password,10)

    const user=await usermodel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

const LoginUser=async(req,res)=>{
    const {email,password}=req.body

    const user =await usermodel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    
    if (!isPasswordValid) {
        return res.status(400).json({
            message:"invalid email or password"
        })  
    }

    const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    res.status(201).json({
        message:"User LoggedIn Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

const LogoutUser=async(req,res)=>{
    const token =req.cookies.token

    if (token) {
        await blacklistModel.create({token})
    }

    res.clearCookie('token')

    res.status(200).json({
        message:"User LoggedOut Successfully"
    })
}

const getmeUser=async(req,res)=>{
    const user=await usermodel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email, 
        }
    })

}


export default {RegisterUser,LoginUser,LogoutUser,getmeUser}