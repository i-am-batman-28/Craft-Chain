import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authCookies } from '../../utils/cookies';

// Initialize state from cookies
const initializeStateFromCookies = () => {
    if (typeof window !== 'undefined') {
        const userData = authCookies.getUserData();
        if (userData) {
            return {
                walletAddress: userData.walletAddress || null,
                isAuthenticated: true,
                userType: userData.userType || null,
                name: userData.name || null,
                email: userData.email || null,
                phone: userData.phone || null,
                userId: userData.userId || null,
                loading: false,
                error: null
            };
        }
    }
    return {
        walletAddress: null,
        isAuthenticated: false,
        userType: null,
        name: null,
        email: null,
        phone: null,
        userId: null,
        loading: false,
        error: null
    };
};

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
    initialState: initializeStateFromCookies(),
    reducers: {
        login: (state, action) => {
            const { userData, rememberMe = false } = action.payload;
            
            // Update state
            state.walletAddress = userData.walletAddress || null;
            state.isAuthenticated = true;
            state.userType = userData.userType || null;
            state.name = userData.name || null;
            state.email = userData.email || null;
            state.phone = userData.phone || null;
            state.userId = userData.userId || userData._id || null;
            state.loading = false;
            state.error = null;
            
            // Save to cookies
            authCookies.setAuthCookies(userData, rememberMe);
        },
        logout: (state) => {
            state.walletAddress = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.name = null;
            state.email = null;
            state.phone = null;
            state.userId = null;
            state.error = null;
            
            // Clear cookies
            authCookies.clearAuthCookies();
        },
        setUserInfo: (state, action) => {
            const { name, userType, email, phone } = action.payload;
            state.name = name || state.name;
            state.userType = userType || state.userType;
            state.email = email || state.email;
            state.phone = phone || state.phone;
            
            // Update cookies with new user info
            const userData = {
                walletAddress: state.walletAddress,
                userType: state.userType,
                name: state.name,
                email: state.email,
                phone: state.phone,
                userId: state.userId
            };
            authCookies.setAuthCookies(userData, true); // Assume remember me for updates
        },
        clearError: (state) => {
            state.error = null;
        },
        initializeAuth: (state) => {
            // Re-initialize from cookies (useful for app startup)
            const cookieState = initializeStateFromCookies();
            Object.assign(state, cookieState);
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

export const { login, logout, setUserInfo, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;