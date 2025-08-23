const mongoose = require('mongoose');

// MongoDB connection - using the corrected URI
const MONGODB_URI = 'mongodb+srv://karthik_ms_28:puzha248%2B@cluster0.84dkqlj.mongodb.net/craftchain?retryWrites=true&w=majority&appName=Cluster0';

// Product Schema (matching your model)
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: String,
    artisanName: {
        type: String,
        required: true,
    },
    artisanAddress: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    badge: {
        type: String,
        default: "New",
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    contractAddress: String,
    tokenId: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Static products data to seed
const productsToSeed = [
    {
        name: "Traditional Clay Pottery",
        description: "Hand-crafted clay pottery using traditional techniques passed down through generations",
        price: 1250,
        originalPrice: 1500,
        category: "pottery",
        imageUrl: "/pottery.jpg",
        artisanName: "Ramesh Kumar",
        artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        location: "Jaipur, Rajasthan",
        rating: 4.8,
        reviews: 124,
        badge: "Bestseller",
        inStock: true
    },
    {
        name: "Handwoven Pashmina Shawl",
        description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns",
        price: 3500,
        originalPrice: 4200,
        category: "textiles",
        imageUrl: "/p.jpg",
        artisanName: "Fatima Begum",
        artisanAddress: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
        location: "Srinagar, Kashmir",
        rating: 4.9,
        reviews: 89,
        badge: "Premium",
        inStock: true
    },
    {
        name: "Brass Temple Bell",
        description: "Traditional brass bell crafted using ancient metalworking techniques",
        price: 850,
        originalPrice: 1000,
        category: "metalwork",
        imageUrl: "/b.jpg",
        artisanName: "Vishnu Prajapati",
        artisanAddress: "0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1",
        location: "Moradabad, UP",
        rating: 4.7,
        reviews: 156,
        badge: "Trending",
        inStock: true
    },
    {
        name: "Madhubani Painting",
        description: "Traditional Madhubani artwork depicting cultural stories and motifs",
        price: 2200,
        originalPrice: 2800,
        category: "art",
        imageUrl: "/m.jpg",
        artisanName: "Lakshmi Devi",
        artisanAddress: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0",
        location: "Madhubani, Bihar",
        rating: 4.9,
        reviews: 203,
        badge: "Featured",
        inStock: true
    },
    {
        name: "Wooden Handicraft",
        description: "Intricately carved wooden decorative items made from sustainable wood",
        price: 1800,
        originalPrice: 2100,
        category: "woodwork",
        imageUrl: "/shopping-2.jpg",
        artisanName: "Suresh Sharma",
        artisanAddress: "0x4F3E2D1C0B9A8F7E6D5C4B3A2E1D0C9B8A7F6E5",
        location: "Saharanpur, UP",
        rating: 4.6,
        reviews: 98,
        badge: "Eco-Friendly",
        inStock: true
    },
    {
        name: "Zari Embroidered Saree",
        description: "Hand-embroidered silk saree with traditional zari work",
        price: 4500,
        originalPrice: 5200,
        category: "textiles",
        imageUrl: "/shopping.jpg",
        artisanName: "Priya Patel",
        artisanAddress: "0x5E4D3C2B1A0F9E8D7C6B5A4E3D2C1B0A9F8E7D6",
        location: "Varanasi, UP",
        rating: 4.8,
        reviews: 167,
        badge: "Luxury",
        inStock: false
    }
];

async function seedDatabase() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        console.log('🗑️ Clearing existing products...');
        await Product.deleteMany({});
        console.log('✅ Existing products cleared');

        // Insert new products
        console.log('🌱 Seeding products...');
        const insertedProducts = await Product.insertMany(productsToSeed);
        console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);

        // Display seeded products
        console.log('\n📦 Seeded Products:');
        insertedProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.price} (${product.artisanName})`);
        });

        console.log('\n🎉 Database seeding completed successfully!');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding
seedDatabase();
