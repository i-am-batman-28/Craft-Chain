"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { setWalletAddress } from "@/store/slices/authSlice";

export default function WalletConnect({ onSuccess }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    async function connectWallet() {
        if (typeof window.ethereum === "undefined") {
            setError("Please install MetaMask!");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const address = accounts[0];

            // Don't dispatch here, let the parent component handle the flow
            if (onSuccess) onSuccess(address);

            // Listen for account changes
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                    dispatch(setWalletAddress(null));
                } else {
                    const newAddress = accounts[0];
                    if (onSuccess) onSuccess(newAddress);
                }
            });
        } catch (err) {
            setError("Failed to connect wallet");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={connectWallet}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
    );
}
