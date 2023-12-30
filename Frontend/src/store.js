import { configureStore } from "@reduxjs/toolkit"
import movieReducerDummy from "./slice/slice"

const store = configureStore({
    reducer: {
        movieReducer: movieReducerDummy
    }
})

export default store;