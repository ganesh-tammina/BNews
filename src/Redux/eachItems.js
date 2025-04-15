
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const eachItem = createAsyncThunk("eachItem", async()=>{
    const myitems = await fetch("http://localhost:5500/items")
    return myitems.json()
})





const itemSlice = createSlice({
    name:"items",
    initialState:{
        isLoading:false,
        itemdata:[],
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(eachItem.pending,(state, action)=>{
            state.isLoading=true
        })
        builder.addCase(eachItem.fulfilled,(state, action)=>{
               state.isLoading=false;
            state.itemdata = action.payload
        })
        builder.addCase(eachItem.rejected,(state, action)=>{
            state.error=true

        })
    }
})

export default itemSlice.reducer;