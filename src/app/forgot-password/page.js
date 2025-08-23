"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
            <Navbar />
            
            <div className="pt-24 pb-16">
                <div className="container-custom">
                    <div className="max-w-md mx-auto">
                        <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-luxury p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-simple font-bold text-neutral-900 mb-2">
                                    Forgot Password?
                                </h1>
                                <p className="text-neutral-600">
                                    No worries! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                            Email Sent!
                                        </h3>
                                        <p className="text-neutral-600 mb-6">
                                            We've sent password reset instructions to {email}
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Didn't receive the email? Check your spam folder or{" "}
                                            <button 
                                                onClick={() => setSuccess(false)}
                                                className="text-primary-600 hover:text-primary-700"
                                            >
                                                try again
                                            </button>
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="input-base"
                                            placeholder="Enter your email address"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-luxury hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            "Send Reset Instructions"
                                        )}
                                    </motion.button>
                                </form>
                            )}

                            {/* Back to Login */}
                            <div className="text-center mt-8">
                                <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700 flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Login
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
