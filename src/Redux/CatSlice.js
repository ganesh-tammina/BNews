
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const catTodo = createAsyncThunk("catTodo", async()=>{
    const mydata = await fetch("http://localhost:5500/comments")
    return mydata.json()
})





const catSlice = createSlice({
    name:"Cat",
    initialState:{
        isLoading:false,
        mydata:[],
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(catTodo.pending,(state, action)=>{
            state.isLoading=true
        })
        builder.addCase(catTodo.fulfilled,(state, action)=>{
               state.isLoading=false;
            state.mydata = action.payload
        })
        builder.addCase(catTodo.rejected,(state, action)=>{
            state.error=true

        })
    }
})

export default catSlice.reducer;