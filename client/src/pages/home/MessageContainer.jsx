import React, { useEffect } from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getMessageThunk } from '../../store/slice/message/message.thunk'
import SendMessage from './SendMessage'
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
  const dispatch = useDispatch()
  const { selectedUser, userProfile } = useSelector(state => state.userReducer)
  const { messages } = useSelector(state => state.messageReducer)

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }))
    }
  }, [selectedUser, dispatch])

  return (
    <div className='flex-1 flex flex-col h-full bg-base-200 relative'>
      {!selectedUser ? (
        <NoChatSelected userProfile={userProfile} />
      ) : (
        <>
          {/* Chat Header */}
          <div className='bg-base-100/80 backdrop-blur-sm px-6 py-3 border-b border-base-300 flex items-center gap-4 shadow-sm z-10'>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.avatar} alt="user" />
              </div>
            </div>
            <div>
              <h3 className='font-bold text-lg'>{selectedUser?.fullName}</h3>
              <span className='text-xs text-success'>Online</span> 
            </div>
          </div>

          {/* Messages Area */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages?.length > 0 ? (
                messages.map(message => (
                    <Message key={message._id} messageDetails={message} />
                ))
            ) : (
                <div className='flex justify-center items-center h-full text-gray-500'>
                    <p>Say Hi to start the conversation!</p>
                </div>
            )}
          </div>

          {/* Input Area */}
          <SendMessage />
        </>
      )}
    </div>
  )
}

const NoChatSelected = ({ userProfile }) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {userProfile?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-6xl text-center' />
      </div>
    </div>
  )
}

export default MessageContainer