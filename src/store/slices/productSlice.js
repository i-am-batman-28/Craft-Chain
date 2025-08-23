import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { addProduct, setProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;
