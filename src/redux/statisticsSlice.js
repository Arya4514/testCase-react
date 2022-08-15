import { createSlice } from "@reduxjs/toolkit";

const statisticsSlice = createSlice({
    name: "statistics",
    initialState: { stats: [], resetData: false },
    reducers: {
        add(state, action) {
            return { ...state, stats: action.payload }
        },
        reset(state, action) {
            return { ...state, resetData: action.payload }
        }
    }
})



export const { add, reset } = statisticsSlice.actions

export default statisticsSlice.reducer;