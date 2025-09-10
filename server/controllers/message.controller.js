import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import mongoose from "mongoose";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage=asyncHandler(async (req,res,next)=>{
    const senderId = new mongoose.Types.ObjectId(req.user._id);
    const receiverId = new mongoose.Types.ObjectId(req.params.receiverId);
    const message=req.body.message

    if(!senderId || !receiverId || !message){
        return next(new errorHandler("All Fields are Required",400))
    }

    let conversation= await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation =await Conversation.create({
            participants:[senderId,receiverId]
        })
    }

    const newMessage= await Message.create({
        senderId,
        receiverId,
        message
    }) 
    if(newMessage){
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
    const socketId=getSocketId(receiverId);
    io.to(socketId).emit("newMessage",newMessage)

    res.status(200)
    .json({
        success:true,
        responseData:
            newMessage
    })
})
export const getMessage=asyncHandler(async (req,res,next)=>{
    const myId=req.user._id
    const otherParticipantId=req.params.otherParticipantId

    if(!myId || !otherParticipantId){
        return next(new errorHandler("All Fields are Required",400))
    }

    let conversation= await Conversation.findOne({
        participants:{$all:[myId,otherParticipantId]}
    }).populate("messages")

   

    res.status(200)
    .json({
        success:true,
        responseData:{
            conversation
        }
    })
})