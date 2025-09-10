import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk'

const initialState={
    buttonLoading:false,
    screenLoading:false,
    messages:[]
  }

  export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
      setNewMessage:(state,action)=>{
        const oldMessages=state.messages || []
        state.messages=[...oldMessages,action.payload]
      }
  },
  extraReducers: (builder) => {
    //for sending message
      builder.addCase(sendMessageThunk.pending, (state, action) => {
        state.buttonLoading=true;
      })
      builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.messages=[...state.messages,action.payload?.responseData]
        state.buttonLoading=false;
        
      })
      builder.addCase(sendMessageThunk.rejected, (state, action) => {
        state.buttonLoading=false;
      })

      //for getting message
      builder.addCase(getMessageThunk.pending, (state, action) => {
        state.buttonLoading=true;
      })
      builder.addCase(getMessageThunk.fulfilled, (state, action) => {
        state.messages = action.payload?.responseData?.conversation?.messages ||[]
        state.buttonLoading=false;
        // console.log("payload", action.payload);
      })
      builder.addCase(getMessageThunk.rejected, (state, action) => {
        state.buttonLoading=false;
      })
  },
})

export const {setNewMessage} = messageSlice.actions

export default messageSlice.reducer