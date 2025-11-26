import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

const SendMessage = () => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.userReducer)
    const [message, setMessage] = useState("")

    const handleSendMessage = async (e) => {
        e.preventDefault() // Prevent page reload on form submit
        if(!message.trim()) return;

        await dispatch(sendMessageThunk({
            receiverId: selectedUser?._id,
            message
        }))
        setMessage("")
    }

    return (
        <form onSubmit={handleSendMessage} className='p-4 bg-base-100 border-t border-base-300'>
            <div className='flex items-center gap-2'>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered w-full rounded-full focus:border-primary"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button type="submit" className="btn btn-circle btn-primary text-white">
                    <IoSend className='text-lg' />
                </button>
            </div>
        </form>
    )
}

export default SendMessage