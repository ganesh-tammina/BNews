
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("fetchTodo", async ()=>{
    const data = await fetch("http://localhost:5500/posts")
    return data.json()
})




const bookSlice = createSlice({
    name:"todo",
    initialState:{
        isLoading:false,
        data:[],
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTodo.pending,(state, action)=>{
            state.isLoading=true
        })
        builder.addCase(fetchTodo.fulfilled,(state, action)=>{
               state.isLoading=false;
            state.data = action.payload
        })
        builder.addCase(fetchTodo.rejected,(state, action)=>{
            state.error=true

        })
    }
})

export default bookSlice.reducer;



