import { app, server } from "./socket/socket.js";
import express from 'express'
import { connectDB } from './db/connection1.db.js'
import cookieParser from "cookie-parser";
import cors from 'cors'


connectDB();
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

const PORT=process.env.PORT || 5000


//routes
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)


import { errorMiddleware } from "./middleware/error.middleware.js";
app.use(errorMiddleware);

server.listen(PORT,()=>{
    console.log(`Your Server is running on port ${PORT}`)
})