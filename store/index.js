import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./reducer/albumSlice";
import cartReducer from "./reducer/cartSliece";
// store

const store = configureStore({
  reducer: {
    albumReducer,
    cartReducer,
  },
});

export default store;
