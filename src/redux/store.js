import { configureStore } from "@reduxjs/toolkit";
import statisticsReducers from "./statisticsSlice";

const store = configureStore({
    reducer: {
        statistics: statisticsReducers
    }
})



export default store;