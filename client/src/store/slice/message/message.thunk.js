import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../components/utilities/axiosInstance"

export const sendMessageThunk = createAsyncThunk("message/sendMessage", 
     async ({receiverId,message},{rejectWithValue})=>{
  try{
    const response= await axiosInstance.post(`/message/send/${receiverId}`,{
      message
    })
    return response.data
  }
  catch(error){
    const errorOutput=error?.response?.data?.errMessage;
    toast.error(errorOutput);

    return rejectWithValue(errorOutput)
  }
})
export const getMessageThunk = createAsyncThunk("message/getMessage", 
     async ({receiverId},{rejectWithValue})=>{
  try{
    const response= await axiosInstance.get(`/message/get-messages/${receiverId}`)
    return response.data
  }
  catch(error){
    const errorOutput=error?.response?.data?.errMessage;
    toast.error(errorOutput);

    return rejectWithValue(errorOutput)
  }
})