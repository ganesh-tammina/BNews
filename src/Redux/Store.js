import { configureStore } from "@reduxjs/toolkit"; 
import bookReducer from "../Redux/Slicer"
import categoryReducer from '../Redux/CatSlice';
import  eachReducer  from "../Redux/eachItems";

export const store = configureStore({
    reducer:{
        bookName:bookReducer,
        category : categoryReducer,
        itemName : eachReducer

    }
})


