import React, { useEffect } from 'react'
import MessageContainer from './MessageContainer'
import UserSidebar from './UserSlidebar' // Fixed Typo
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessage } from '../../store/slice/message/message.slice'

function Home() {
  const { isAuthenticated, userProfile } = useSelector(state => state.userReducer)
  const { socket } = useSelector(state => state.socketReducer)
  const dispatch = useDispatch()

  // Initialize Socket
  useEffect(() => {
    if (isAuthenticated && userProfile?._id) {
      dispatch(initializeSocket(userProfile._id))
    }
  }, [isAuthenticated, userProfile, dispatch])

  // Listen for Socket Events
  useEffect(() => {
    if (!socket) return
    
    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users))
    })
    
    socket.on("newMessage", (msg) => {
      dispatch(setNewMessage(msg))
    })

    return () => {
      socket.off("onlineUsers")
      socket.off("newMessage")
    }
  }, [socket, dispatch])

  return (
    // Main Container: Sidebar is Base-300 (darker), Chat is Base-200 (lighter)
    <div className='flex h-screen overflow-hidden bg-base-200'>
      <UserSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home