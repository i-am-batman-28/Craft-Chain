import { createSlice } from "@reduxjs/toolkit";
import { loadAuthState, saveAuthState, clearAuthState } from "@/utils/auth";

const initialState = loadAuthState() || {
    user: null,
    walletAddress: null,
    isAuthenticated: false,
    userType: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
            saveAuthState(state);
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.userType = action.payload.userType;
            state.walletAddress = action.payload.walletAddress;
            saveAuthState(state);
        },
        logout: (state) => {
            state.user = null;
            state.walletAddress = null;
            state.isAuthenticated = false;
            state.userType = null;
            clearAuthState();
        },
    },
});

export const { setWalletAddress, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
