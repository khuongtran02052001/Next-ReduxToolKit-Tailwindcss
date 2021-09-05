import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAlbum = createAsyncThunk("album/getAlbum", async () => {
  const response = await axios.get(
    "https://fakestoreapi.com/products?_limit=5"
  );
  return response.data;
});
const albumSlice = createSlice({
  name: "album",
  initialState: {
    allAlbums: [],
  },
  reducers: {
    makeAddItem(state, action) {
      const id = action.payload;
      state.allAlbums = id;
    },
  },

  extraReducers: {
    [getAlbum.fulfilled]: (state, action) => {
      state.allAlbums = action.payload;
    },
  },
});

// Reducer

const albumReducer = albumSlice.reducer;

// Selector

export const albumSelector = (state) => state.albumReducer.allAlbums;

export const { makeAddItem } = albumSlice.actions;

export default albumReducer;
