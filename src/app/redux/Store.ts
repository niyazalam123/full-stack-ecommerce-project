import { configureStore } from "@reduxjs/toolkit";
import cartdataReducer from "@/app/redux/Slice"

export const Store = configureStore({
    reducer: {
        cartData:cartdataReducer
    }
})