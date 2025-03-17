import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import registerSlice from '../features/register/registerSlice'
import taskSlice from '../features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerSlice,
    tasks: taskSlice
  },
})
