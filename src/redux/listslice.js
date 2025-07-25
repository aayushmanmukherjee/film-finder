import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-hot-toast"

const initialState = {
  value: 0,
}

export const listslice = createSlice({
  name: 'list',
  initialState:{
            lists:localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : []
        },
  reducers: {
    addToList: (state,action) => {
      const list = action.payload;
      const index = state.lists.findIndex((i)=>i.id===list.id)
    if(index>=0) {
        toast.error("movie already exists in personal list")
        return
    }
      state.lists.push(list)
      localStorage.setItem("lists",JSON.stringify(state.lists))
      toast.success("movie added to personal list")

    },
    
    remove: (state, action) => {
      const list = action.payload
     const index = state.lists.findIndex((i)=>i.id===list.id)
     if (index>=0) {
        state.lists.splice(index,1)
        localStorage.setItem("lists",JSON.stringify(state.lists))
        toast.success("movie removed from personal list")
     }
    },
  },
})

export const { addToList, remove } = listslice.actions

export default listslice.reducer