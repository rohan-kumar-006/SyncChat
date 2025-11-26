import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/user.slice'

const User = ({ userDetails }) => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.userReducer)
    const { onlineUsers } = useSelector(state => state.socketReducer)

    const isUserOnline = onlineUsers?.includes(userDetails?._id)
    const isSelected = selectedUser?._id === userDetails?._id

    const handleUserClick = () => {
        dispatch(setSelectedUser(userDetails))
    }

    return (
        <div 
            onClick={handleUserClick} 
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 
            ${isSelected ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
        >
            <div className={`avatar ${isUserOnline ? 'online' : ''}`}>
                <div className="w-10 rounded-full border border-base-300">
                    <img src={userDetails?.avatar || "https://avatar.iran.liara.run/public"} alt="avatar" />
                </div>
            </div>
            
            <div className='flex flex-col overflow-hidden'>
                <h2 className='font-semibold text-sm truncate capitalize'>{userDetails?.fullName}</h2>
                <p className={`text-xs truncate ${isSelected ? 'text-primary-content/70' : 'text-base-content/60'}`}>
                    @{userDetails?.username}
                </p>
            </div>
        </div>
    )
}

export default User