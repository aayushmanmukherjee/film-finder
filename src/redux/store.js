import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listslice'
export const store = configureStore({
  reducer: {
    list:listReducer
  },
})
