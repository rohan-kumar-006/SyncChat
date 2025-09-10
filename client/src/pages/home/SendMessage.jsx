import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

const SendMessage = () => {

    const dispatch=useDispatch()
    const {selectedUser}=useSelector(state=>state.userReducer)
    const [message,setMessage]=useState("")

    const handleSendMessage=()=>{
        dispatch(
            sendMessageThunk({
                receiverId:selectedUser?._id,
                message
            })
        )
        setMessage("")
    }

  return (
    <div className='w-full p-3 flex gap-2 border-t border-t-white/10'>
            <input
            type="text" 
            placeholder="Type Here..." 
            className="input input-primary w-full" 
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            />
            <button onClick={handleSendMessage} className="btn btn-square border border-[#605dff]">
              <IoSend />
            </button>
          </div>
  )
}

export default SendMessage