import { createSlice } from '@reduxjs/toolkit'
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserProfileThunk,
  getOtherUserThunk,
  updateUserProfileThunk
} from './user.thunk'
import { act } from 'react'

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsers: null,
  buttonLoading: false,
  screenLoading: true,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser"))
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload))
      state.selectedUser = action.payload
    }
  },
  extraReducers: (builder) => {
    //for login
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    })
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user
      state.buttonLoading = false;
      state.isAuthenticated = true;

    })
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    })

    //for register
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    })
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user
      state.buttonLoading = false;
      state.buttonLoading = false;

    })
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    })

    //logout
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    })
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null
      state.isAuthenticated = false
      state.otherUsers = null;
      state.buttonLoading = false;
      state.selectedUser = null;
      localStorage.clear()
    })
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    })
    //getProfile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    })
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData
      state.isAuthenticated = true
      state.screenLoading = false;

    })
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    })

    //get other users

    builder.addCase(getOtherUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    })
    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData
    })
    builder.addCase(getOtherUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    })
    //update user

    builder.addCase(updateUserProfileThunk.pending, (state) => {
      state.buttonLoading = true;
    })
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.buttonLoading = false;
    })
    builder.addCase(updateUserProfileThunk.rejected, (state) => {
      state.buttonLoading = false;
    })
  },
})

export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer