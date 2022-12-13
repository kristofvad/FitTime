import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import sessionReducer from '../features/sessions/sessionSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
    user: userReducer
  },
})

