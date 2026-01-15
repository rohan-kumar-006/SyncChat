import { response } from "express";
import User from "../models/user.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs" 
import jwt from 'jsonwebtoken'

export const register = asyncHandler(async (req, res, next) => {
    const { fullName, username, password, gender } = req.body

    if (!fullName || !username || !gender || !password) {
        return next(new errorHandler("All Fileds are required",400))
    }

    const user=await User.findOne({username})

    if(user){
        return next(new errorHandler("User already exists",400))
    }   
    const hashedPassword=await bcrypt.hash(password,10);

    const avatarType=gender==="male"?"boy":"girl";
    const avatar=`https://avatar.iran.liara.run/public/${avatarType}?username=${username}`

    const newUser=await User.create({
        username,
        fullName,
        password:hashedPassword,
        gender,
        avatar
    })

    const tokenData={
        _id:newUser?._id
    }
    const token=jwt.sign(tokenData,process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})

    res
    .status(200)
    .cookie("token",token,{
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000
        ),
        httpOnly:true,
        secure:true,
        sameSite:'None'
    })
    .json({
        success:true,
        responseData:{
            newUser
        }
    })
});
export const login = asyncHandler(async (req, res, next) => {
    const {username, password } = req.body

    if (!username || !password) {
        return next(new errorHandler("All Fileds are required",400))
    }

    const user=await User.findOne({username})

    if(!user){
        return next(new errorHandler("Please Enter Valid Username and Password",400))
    }   
    const isValidPassword=await bcrypt.compare(password,user.password);
    
    if(!isValidPassword){
        return next(new errorHandler("Please Enter Valid Username and Password",400))
    }

    const tokenData={
        _id:user?._id
    }
    const token=jwt.sign(tokenData,process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})

    return res.status(200)
    .cookie("token",token,{
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000
        ),
        httpOnly:true,
        secure:true,
        sameSite:'None'
    })
    .json({
        success:true,
        responseData:{
            user
        }
    })
});
export const getProfile = asyncHandler(async (req, res, next) => {
    const userId= req.user._id
    const profile= await User.findById(userId);
    
    res.status(200)
    .json({
        success:true,
        responseData:profile
    })
});
export const logout = asyncHandler(async (req, res, next) => {
    
    const userId= req.user._id
    const profile= await User.findById(userId);
    
    res.status(200)
  .cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),  
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  })
  .json({
    success: true,
    responseData: profile
  });
});
export const getOtherUsers = asyncHandler(async (req, res, next) => {

    const otherUsers=await User.find({_id : {$ne : req.user._id}})

    res.status(200)
    .json({
        success:true,
        responseData:otherUsers
    })
});

export const updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { fullName } = req.body;

    const updateData = {};
    
    if (fullName) updateData.fullName = fullName;
    

    if (req.file) {
        updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        responseData: updatedUser
    });
});