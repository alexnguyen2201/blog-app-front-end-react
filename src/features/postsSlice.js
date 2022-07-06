import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postsSlice = createSlice({
    name: "post",
    initialState,
});

export default postsSlice.reducer;
