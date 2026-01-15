import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Message = ({ messageDetails }) => {
    const { userProfile, selectedUser } = useSelector(state => state.userReducer)
    const scrollRef = useRef()
    const [senderAvatarError, setSenderAvatarError] = useState(false)
    const [receiverAvatarError, setReceiverAvatarError] = useState(false)

    const extractTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Just now"; 
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };
        
    const getInitials = (name = '') => {
        if (!name) return 'U'

        const words = name.split(' ')
        const first = words[0][0]
        const second = words[1]?.[0] || ''

        return (first + second).toUpperCase()
    };

    // Check if avatar is a custom upload (Cloudinary URL)
    const isCustomAvatar = (avatar) => {
        return avatar && avatar.includes('cloudinary')
    }

    const isSender = messageDetails?.senderId === userProfile?._id;
    const time = extractTime(messageDetails?.createdAt || Date.now());
    
    const currentUser = isSender ? userProfile : selectedUser;
    const displayName = isSender ? 'You' : selectedUser?.fullName;
    const avatarError = isSender ? senderAvatarError : receiverAvatarError;
    const setAvatarError = isSender ? setSenderAvatarError : setReceiverAvatarError;

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageDetails])

    return (
        <div ref={scrollRef} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full border border-base-300 overflow-hidden">
                    {isCustomAvatar(currentUser?.avatar) && !avatarError ? (
                        <img
                            src={currentUser.avatar}
                            alt={currentUser?.fullName || currentUser?.username}
                            className="w-full h-full object-cover"
                            onError={() => setAvatarError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-100">
                            <span className="font-bold text-sm uppercase text-amber-800">
                                {getInitials(currentUser?.fullName || currentUser?.username)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="chat-header opacity-50 text-xs mb-1">
               {displayName}
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