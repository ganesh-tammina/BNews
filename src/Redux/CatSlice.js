
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const categorySlice = createSlice({
    name:"category",
    initialState:{
        mydata:[],
    },
    reducers:{
        setCategories:(state, action) =>{
            state.list = action.payload
        }
    }
})
export const { setCategories } = categorySlice.actions
export default categorySlice.reducer;