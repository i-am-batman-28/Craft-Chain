import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    purchases: [
        {
            id: 1,
            productName: "Handcrafted Copper Vessel",
            artisanName: "Rajesh Kumar",
            price: "0.8",
            date: "2024-01-25",
            imageUrl: "/copper-vessel.jpg",
            status: "Delivered",
            transactionHash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            description: "Traditional copper vessel handcrafted by skilled artisans using age-old techniques. Perfect for storing water and promoting health benefits."
        }
    ]
};

const purchaseSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        addPurchase: (state, action) => {
            state.purchases.push(action.payload);
        },
        updateFeedback: (state, action) => {
            const { id, rating, comment } = action.payload;
            const purchase = state.purchases.find(p => p.id === id);
            if (purchase) {
                purchase.feedback = { rating, comment };
            }
        }
    }
});

export const { addPurchase, updateFeedback } = purchaseSlice.actions;
export default purchaseSlice.reducer;