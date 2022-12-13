import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../auth/authService'
import userService from './userService'



const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


//Update user
export const updateUser = createAsyncThunk('users/update', async({id, userData} , thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return userService.updateUser(id, userData, token)
  } catch (error) {
      const message = (
          error.response && 
          error.response.data && 
          error.response.data.message) || 
          error.message || 
          error.toString()
          return thunkAPI.rejectWithValue(message)
  }
})


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = state.users.map((item) => {
            if (item._id === action.payload._id) {
                return action.payload;
            }
            return item;
        });
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer