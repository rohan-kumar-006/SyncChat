import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({ messageDetails }) => {
    const { userProfile, selectedUser } = useSelector(state => state.userReducer)
    const scrollRef = useRef()

    // Helper to format time
    const extractTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Just now"; 
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const isSender = messageDetails?.senderId === userProfile?._id;
    const time = extractTime(messageDetails?.createdAt || Date.now());

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageDetails])

    return (
        <div ref={scrollRef} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="avatar"
                        src={isSender ? userProfile?.avatar : selectedUser?.avatar}
                    />
                </div>
            </div>
            
            <div className="chat-header opacity-50 text-xs mb-1">
               {isSender ? 'You' : selectedUser?.fullName}
            </div>

            <div className={`chat-bubble ${isSender ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}>
                {messageDetails?.message}
            </div>
            
            <div className="chat-footer opacity-50 text-xs mt-1">
                {time}
            </div>
        </div>
    )
}

export default Message