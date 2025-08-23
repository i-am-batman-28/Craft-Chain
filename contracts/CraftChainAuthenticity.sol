// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CraftChainAuthenticity
 * @dev NFT contract for issuing authenticity certificates for Indian handicrafts
 * Each NFT represents a verified authentic handcrafted item with full provenance
 */
contract CraftChainAuthenticity is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Certificate data structure
    struct Certificate {
        string productName;
        string artisanName;
        string artisanLocation;
        string category;
        uint256 purchasePrice;
        string paymentId;
        uint256 issueDate;
        address originalBuyer;
        bool isActive;
    }
    
    // Mapping from token ID to certificate data
    mapping(uint256 => Certificate) public certificates;
    
    // Mapping from payment ID to token ID (prevent duplicate certificates)
    mapping(string => uint256) public paymentToToken;
    
    // Mapping of authorized platforms that can mint certificates
    mapping(address => bool) public authorizedPlatforms;
    
    // Events
    event CertificateIssued(
        uint256 indexed tokenId,
        string productName,
        string artisanName,
        address indexed buyer,
        string paymentId
    );
    
    event CertificateRevoked(uint256 indexed tokenId, string reason);
    
    modifier onlyAuthorized() {
        require(authorizedPlatforms[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }
    
    constructor() ERC721("CraftChain Authenticity Certificate", "CCAC") {
        // Platform owner is authorized by default
        authorizedPlatforms[msg.sender] = true;
    }
    
    /**
     * @dev Mint a new authenticity certificate NFT
     * @param buyer Address of the buyer
     * @param productName Name of the handcraft item
     * @param artisanName Name of the artisan who created it
     * @param artisanLocation Location of the artisan
     * @param category Category of the craft (pottery, textiles, etc.)
     * @param purchasePrice Price paid in INR (wei equivalent)
     * @param paymentId Unique payment ID from Razorpay
     * @param metadataURI IPFS URI for detailed metadata
     */
    function issueCertificate(
        address buyer,
        string memory productName,
        string memory artisanName,
        string memory artisanLocation,
        string memory category,
        uint256 purchasePrice,
        string memory paymentId,
        string memory metadataURI
    ) public onlyAuthorized returns (uint256) {
        require(buyer != address(0), "Invalid buyer address");
        require(bytes(productName).length > 0, "Product name required");
        require(bytes(artisanName).length > 0, "Artisan name required");
        require(bytes(paymentId).length > 0, "Payment ID required");
        require(paymentToToken[paymentId] == 0, "Certificate already exists for this payment");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        // Mint the NFT to the buyer
        _mint(buyer, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        
        // Store certificate data
        certificates[newTokenId] = Certificate({
            productName: productName,
            artisanName: artisanName,
            artisanLocation: artisanLocation,
            category: category,
            purchasePrice: purchasePrice,
            paymentId: paymentId,
            issueDate: block.timestamp,
            originalBuyer: buyer,
            isActive: true
        });
        
        // Map payment ID to token ID
        paymentToToken[paymentId] = newTokenId;
        
        emit CertificateIssued(newTokenId, productName, artisanName, buyer, paymentId);
        
        return newTokenId;
    }
    
    /**
     * @dev Get certificate details for a token
     */
    function getCertificate(uint256 tokenId) public view returns (Certificate memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }
    
    /**
     * @dev Verify if a certificate is authentic and active
     */
    function verifyCertificate(uint256 tokenId) public view returns (bool) {
        if (!_exists(tokenId)) return false;
        return certificates[tokenId].isActive;
    }
    
    /**
     * @dev Get certificate by payment ID
     */
    function getCertificateByPayment(string memory paymentId) public view returns (uint256, Certificate memory) {
        uint256 tokenId = paymentToToken[paymentId];
        require(tokenId != 0, "No certificate found for this payment");
        return (tokenId, certificates[tokenId]);
    }
    
    /**
     * @dev Revoke a certificate (only owner or authorized platform)
     */
    function revokeCertificate(uint256 tokenId, string memory reason) public onlyAuthorized {
        require(_exists(tokenId), "Certificate does not exist");
        certificates[tokenId].isActive = false;
        emit CertificateRevoked(tokenId, reason);
    }
    
    /**
     * @dev Add authorized platform
     */
    function addAuthorizedPlatform(address platform) public onlyOwner {
        authorizedPlatforms[platform] = true;
    }
    
    /**
     * @dev Remove authorized platform
     */
    function removeAuthorizedPlatform(address platform) public onlyOwner {
        authorizedPlatforms[platform] = false;
    }
    
    /**
     * @dev Get total number of certificates issued
     */
    function totalCertificates() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Get all certificates owned by an address
     */
    function getCertificatesByOwner(address owner) public view returns (uint256[] memory) {
        uint256 ownerBalance = balanceOf(owner);
        uint256[] memory ownerTokens = new uint256[](ownerBalance);
        uint256 ownerIndex = 0;
        
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (_exists(i) && ownerOf(i) == owner) {
                ownerTokens[ownerIndex] = i;
                ownerIndex++;
            }
        }
        
        return ownerTokens;
    }
    
    /**
     * @dev Override transfer functions to emit custom events for tracking
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId);
        
        // Log certificate ownership changes for provenance tracking
        if (from != address(0) && to != address(0)) {
            // This is a transfer (not mint or burn)
            // You could emit custom events here for tracking ownership history
        }
    }
}
