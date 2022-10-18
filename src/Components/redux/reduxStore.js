import { configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "./bookSlice";
const store = configureStore({
  reducer:{
    bookSlice: bookSliceReducer,
  }, 
})

export default store