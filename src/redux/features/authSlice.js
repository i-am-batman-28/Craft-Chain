import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for wallet connection
export const connectWallet = createAsyncThunk(
    'auth/connectWallet',
    async (_, { rejectWithValue }) => {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            // Clear any existing connections
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }]
            });

            // Request new account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            return {
                walletAddress: accounts[0],
                isAuthenticated: false // Force new registration
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        walletAddress: null,
        isAuthenticated: false,
        userType: null,
        name: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.walletAddress = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.name = null;
        },
        setUserInfo: (state, action) => {
            state.name = action.payload.name;
            state.userType = action.payload.userType;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
                // Clear existing user data
                state.userType = null;
                state.name = null;
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.walletAddress = action.payload.walletAddress;
                state.isAuthenticated = false; // Force re-authentication
                state.userType = null;
                state.name = null;
            })
            .addCase(connectWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.walletAddress = null;
                state.userType = null;
                state.name = null;
            });
    }
});

export const { logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;