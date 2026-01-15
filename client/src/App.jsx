import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './App.css'
import { getOtherUserThunk, getUserProfileThunk, loginUserThunk } from './store/slice/user/user.thunk'
import { Toaster } from 'react-hot-toast';

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUserProfileThunk())
    dispatch(getOtherUserThunk())
  },[])
  return (
    <>    
    <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App
