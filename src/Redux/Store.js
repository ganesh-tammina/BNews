import { configureStore } from "@reduxjs/toolkit"; 
import bookReducer from "../Redux/Slicer"
import  catReducer  from "../Redux/CatSlice";
import  eachReducer  from "../Redux/eachItems";

export const store = configureStore({
    reducer:{
        bookName:bookReducer,
        catName : catReducer,
        itemName : eachReducer

    }
})


