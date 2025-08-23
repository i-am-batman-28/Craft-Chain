# MongoDB Atlas Setup Guide

## 🔧 Steps to Complete Configuration:

### 1. Update Password in .env.local
Replace `<db_password>` in your `.env.local` file with your actual MongoDB Atlas password:

```bash
# Before:
MONGODB_URI=mongodb+srv://karthik_ms_28:<db_password>@cluster0.84dkqlj.mongodb.net/craftchain?retryWrites=true&w=majority&appName=Cluster0

# After (example):
MONGODB_URI=mongodb+srv://karthik_ms_28:YourActualPassword123@cluster0.84dkqlj.mongodb.net/craftchain?retryWrites=true&w=majority&appName=Cluster0
```

### 2. Verify Atlas Connection
- Go to MongoDB Atlas dashboard
- Check that your cluster is running
- Ensure your IP address is whitelisted (or use 0.0.0.0/0 for development)

### 3. Test Connection
Run this command to test the connection:
```bash
node scripts/seedProducts.js
```

### 4. Seed Your Atlas Database
Once connected, seed your Atlas database with products:
```bash
# This will populate your cloud database
node scripts/seedProducts.js
```

### 5. Update Vercel Environment Variables
In your Vercel dashboard, make sure the environment variable matches:
```
MONGODB_URI=mongodb+srv://karthik_ms_28:YourPassword@cluster0.84dkqlj.mongodb.net/craftchain?retryWrites=true&w=majority&appName=Cluster0
```

## ✅ Benefits of Using Atlas:
- ✅ Same database for local development and production
- ✅ Data persists across deployments
- ✅ No need to re-seed for each deployment
- ✅ Real-time data sync between environments
- ✅ Professional database hosting

## 🎯 Interview Points:
"I'm using MongoDB Atlas cloud database for both development and production environments. This ensures data consistency, allows real-time collaboration, and provides professional database hosting with built-in security and scalability."
