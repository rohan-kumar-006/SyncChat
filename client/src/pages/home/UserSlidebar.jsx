import React from 'react'
import { IoSearch } from "react-icons/io5";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../store/slice/user/user.thunk';
import { useState } from 'react';
import { useEffect } from 'react';

const UserSliderbar = () => {
  const [searchValue,setSearchValue]=useState('')
  const [users,setUsers]=useState([])
  const dispatch = useDispatch()
  const { otherUsers, userProfile } = useSelector((state) => {
    return state.userReducer
  })
  useEffect(()=>{
     if(!searchValue){
      setUsers(otherUsers)
     }else{
      setUsers(otherUsers.filter(user=>{
        return user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      }))
     }
  },[searchValue, otherUsers])

  const handleLogout = async () => {
    await dispatch(logoutUserThunk())
  }
  return (
    <div className='max-w-[20em] w-full p-2 h-screen flex flex-col  border-r border-r-white/10'>

      <h1 className='bg-black rounded-lg mt-3 mx-3 px-2 py-1 text-[#605dff] text-xl font-semibold'> SyncChat</h1>

      <div className='p-4'>
        <label className="input ">
          <IoSearch />
          <input onChange={(e)=>setSearchValue(e.target.value)} type="search" required placeholder="Search" />
        </label>
      </div>

      <div className='flex flex-col gap-2 h-full overflow-y-scroll-auto'>
        {users?.map((userDetails) => {
          return (
            <User key={userDetails?._id} userDetails={userDetails} />
          )
        })}

      </div>

      <div className='flex items-center justify-between p-3 border-t border-t-white/10'>
        <div className='flex items-center gap-3 '>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2 className=' '>{userProfile?.fullName}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
      </div>
    </div>
  )
}

export default UserSliderbar