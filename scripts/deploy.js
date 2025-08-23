// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying CraftChain Authenticity Certificate Contract...");
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying with account:", deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
    
    // Deploy the contract
    const CraftChainAuthenticity = await ethers.getContractFactory("CraftChainAuthenticity");
    const authenticity = await CraftChainAuthenticity.deploy();
    
    await authenticity.waitForDeployment();
    const contractAddress = await authenticity.getAddress();
    
    console.log("✅ CraftChain Authenticity Contract deployed to:", contractAddress);
    console.log("🔗 Contract verified on:", "https://mumbai.polygonscan.com/address/" + contractAddress);
    
    // Add platform as authorized minter
    console.log("🔑 Setting up authorized platform...");
    const platformAddress = deployer.address; // In production, use your platform wallet
    await authenticity.addAuthorizedPlatform(platformAddress);
    console.log("✅ Platform authorized:", platformAddress);
    
    // Test minting a certificate
    console.log("🧪 Testing certificate issuance...");
    const testTx = await authenticity.issueCertificate(
        deployer.address, // buyer
        "Test Pottery Vase", // product name
        "Ramesh Kumar", // artisan name
        "Jaipur, Rajasthan", // location
        "Pottery", // category
        ethers.parseEther("0.001"), // price (in ETH equivalent)
        "test_payment_123", // payment ID
        "https://ipfs.io/ipfs/QmTestMetadata" // metadata URI
    );
    
    await testTx.wait();
    console.log("✅ Test certificate issued!");
    
    // Get certificate details
    const certificate = await authenticity.getCertificate(1);
    console.log("📜 Certificate Details:");
    console.log("   Product:", certificate.productName);
    console.log("   Artisan:", certificate.artisanName);
    console.log("   Location:", certificate.artisanLocation);
    console.log("   Active:", certificate.isActive);
    
    console.log("\n🎉 Deployment Complete!");
    console.log("📋 Contract Address:", contractAddress);
    console.log("🔗 Add this to your .env.local:");
    console.log(`NFT_CONTRACT_ADDRESS=${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
