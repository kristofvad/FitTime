import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../auth/authService'
import { logout } from '../auth/authSlice';
import sessionService from './sessionService'

const initialState = {
    sessions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//Create new session
export const createSession = createAsyncThunk('sessions/create', async(sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.createSession(sessionData, token)
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
//Get user sessions
export const getSessions = createAsyncThunk('sessions/getAll', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.getSessions(token)
    } catch (error) {
        if (authService.isAuthIssue(error)) {
            return thunkAPI.dispatch(logout());
        }
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

//Delete new session
export const deleteSession = createAsyncThunk('sessions/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.deleteSession(id, token)
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

//Update new session
export const updateSession = createAsyncThunk('sessions/update', async({id, sessionData} , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return sessionService.updateSession(id, sessionData, token)
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


export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createSession.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createSession.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sessions.push(action.payload)
        })
        .addCase(createSession.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getSessions.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSessions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sessions = action.payload
        })
        .addCase(getSessions.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteSession.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteSession.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sessions = state.sessions.filter((session) => session._id !== action.payload.id)
        })
        .addCase(deleteSession.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateSession.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateSession.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sessions = state.sessions.map((item) => {
                if (item._id === action.payload._id) {
                    return action.payload;
                }
                return item;
            });
        })
        .addCase(updateSession.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = sessionSlice.actions
export default sessionSlice.reducer
