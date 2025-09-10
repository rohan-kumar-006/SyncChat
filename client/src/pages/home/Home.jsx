import React from 'react'
import MessageContainer from './MessageContainer'
import UserSlidebar from './UserSlidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeSocket ,setOnlineUsers} from '../../store/slice/socket/socket.slice'
import { setNewMessage } from '../../store/slice/message/message.slice'



function Home() {

  const { isAuthenticated, userProfile } = useSelector(state => state.userReducer)
  const { socket } = useSelector(state => state.socketReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("hello")
    if (!isAuthenticated) {
      return
    }
    dispatch(initializeSocket(userProfile?._id))
  }, [isAuthenticated])

  useEffect(() => {
    if (!socket) return
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    })
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    })
    return ()=>{
      socket.close()
    }
  }, [socket])


  return (
    <div className='flex bg-black'>
      <UserSlidebar />
      <MessageContainer />
    </div>
  )
}

export default Home