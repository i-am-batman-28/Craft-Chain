import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [
        {
            id: 1,
            name: "Traditional Clay Pottery",
            category: "pottery",
            price: "0.5",
            imageUrl: "/pottery.jpg",
            artisanName: "Ramesh Kumar",
            artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            location: "Jaipur, Rajasthan",
            description: "Hand-crafted clay pottery using traditional techniques passed down through generations"
        },
        {
            id: 2,
            name: "Handwoven Pashmina Shawl",
            category: "textiles",
            price: "0.8",
            imageUrl: "/p.jpg",
            artisanName: "Fatima Begum",
            artisanAddress: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
            location: "Srinagar, Kashmir",
            description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns"
        },
        {
            id: 3,
            name: "Brass Temple Bell",
            category: "metalwork",
            price: "0.4",
            imageUrl: "/b.jpg",
            artisanName: "Vishnu Prajapati",
            artisanAddress: "0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1",
            location: "Moradabad, UP",
            description: "Traditional brass bell crafted using ancient metalworking techniques"
        },
        {
            id: 4,
            name: "Madhubani Painting",
            category: "art",
            price: "1.2",
            imageUrl: "/m.jpg",
            artisanName: "Lakshmi Devi",
            artisanAddress: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0",
            location: "Madhubani, Bihar",
            description: "Traditional Madhubani artwork depicting cultural stories and motifs"
        }
    ]
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
});

export default productSlice.reducer;