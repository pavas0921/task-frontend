import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userRegister } from '../../services/userRegister'

const initialState = {
    loading: false,
    message: null,
    httpStatus: null,
    status: null,
    flag: false,
}

export const Register = createAsyncThunk('user/register', async (body) => {
    const data = await userRegister(body)
    return data
})

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearState: (state) => {
            state.loading = false
            state.httpStatus = null
            state.message = null
            state.status = null
            state.flag = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Register.pending, (state) => {
                state.loading = true
            })
            .addCase(Register.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                if (
                    action.payload && action.payload.httpStatus && action.payload.status
                ) {
                    state.flag = true
                    state.status = action.payload.status
                    state.message = action.payload.message
                    state.httpStatus = action.payload.httpStatus
                }
            })
    },
})

export const { clearState } = registerSlice.actions
export const selectRegisterState = (state) => state.register
export default registerSlice.reducer
