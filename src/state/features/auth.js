import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {},
    token: ""
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});
export const { setUser, setToken } =
    authSlice.actions;
export default authSlice.reducer;