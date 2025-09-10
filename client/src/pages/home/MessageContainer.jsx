import React, { useEffect } from 'react'
import Message from './Message'
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './SendMessage';

const MessageContainer = () => {

  const dispatch = useDispatch()
  const { selectedUser } = useSelector(state => state.userReducer)
  const {messages}=useSelector(state=>state.messageReducer)

  useEffect(() => {
    // console.log(messages)
    if (selectedUser?._id) {

      dispatch(getMessageThunk({ receiverId: selectedUser?._id }))
    }
  }, [selectedUser])

  return (
    <>
      {!selectedUser ?
        (
        <div className='w-full flex flex-col gap-5 justify-center items-center'>
          <h2> Welcome to SyncChat </h2>
          <p  className='text-xl'>Please Select a Person to Chat</p>
          </div>
      )
        :
        (
        <><div className='h-screen w-full flex flex-col'>
          <div className='flex items-center justify-between p-3 border-b border-b-white/10'>
            <User userDetails={selectedUser} />
          </div>

          <div className='h-full overflow-y-auto p-3' >

            {messages?.map(messageDetails=>{
              return(
                <Message key={messageDetails?._id} messageDetails={messageDetails}/>
              )
            })}
          </div>
          <SendMessage/>
        </div></>
      )
      }

    </>
  )
}

export default MessageContainer