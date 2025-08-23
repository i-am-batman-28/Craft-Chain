"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { login } from "@/redux/features/authSlice";
import { authCookies } from "@/utils/cookies";
import Navbar from "@/components/Navbar";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        loginMethod: "email" // "email" or "phone"
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Load saved credentials on component mount
    useEffect(() => {
        const lastCredentials = authCookies.getLastCredentials();
        if (lastCredentials.email || lastCredentials.phone) {
            setFormData(prev => ({
                ...prev,
                email: lastCredentials.email,
                phone: lastCredentials.phone,
                loginMethod: lastCredentials.email ? "email" : "phone"
            }));
            setRememberMe(lastCredentials.rememberMe);
        }
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/marketplace");
        }
    }, [isAuthenticated, router]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    method: "email"
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Dispatch login action with cookie integration
                dispatch(login({ 
                    userData: data.user, 
                    rememberMe 
                }));
                
                // Redirect based on user type
                const redirectPath = data.user.userType === "artisan" ? "/dashboard" : "/marketplace";
                router.push(redirectPath);
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!otpSent) {
            // Send OTP
            try {
                const response = await fetch("/api/auth/send-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: formData.phone }),
                });

                const data = await response.json();

                if (data.success) {
                    setOtpSent(true);
                } else {
                    setError(data.message || "Failed to send OTP");
                }
            } catch (error) {
                console.error("OTP send error:", error);
                setError("Network error. Please try again.");
            }
        } else {
            // Verify OTP and login
            try {
                const response = await fetch("/api/auth/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        phone: formData.phone, 
                        otp: otp,
                        action: "login"
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Dispatch login action with cookie integration
                    dispatch(login({ 
                        userData: data.user, 
                        rememberMe 
                    }));
                    
                    // Redirect based on user type
                    const redirectPath = data.user.userType === "artisan" ? "/dashboard" : "/marketplace";
                    router.push(redirectPath);
                } else {
                    setError(data.message || "Invalid OTP");
                }
            } catch (error) {
                console.error("OTP verification error:", error);
                setError("Network error. Please try again.");
            }
        }
        
        setLoading(false);
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
                                    Welcome Back
                                </h1>
                                <p className="text-neutral-600">
                                    Sign in to your CraftChain account
                                </p>
                            </div>

                            {/* Login Method Toggle */}
                            <div className="flex bg-neutral-100 rounded-2xl p-1 mb-6">
                                <button
                                    onClick={() => {
                                        setFormData({ ...formData, loginMethod: "email" });
                                        setOtpSent(false);
                                        setError("");
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                        formData.loginMethod === "email"
                                            ? "bg-white text-primary-600 shadow-elegant"
                                            : "text-neutral-600"
                                    }`}
                                >
                                    Email
                                </button>
                                <button
                                    onClick={() => {
                                        setFormData({ ...formData, loginMethod: "phone" });
                                        setOtpSent(false);
                                        setError("");
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                        formData.loginMethod === "phone"
                                            ? "bg-white text-primary-600 shadow-elegant"
                                            : "text-neutral-600"
                                    }`}
                                >
                                    Phone
                                </button>
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

                            {/* Email Login Form */}
                            {formData.loginMethod === "email" && (
                                <form onSubmit={handleEmailLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="input-base"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="input-base"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                                            />
                                            <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                                        </label>
                                        <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                                            Forgot password?
                                        </Link>
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
                                                Signing in...
                                            </div>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </motion.button>
                                </form>
                            )}

                            {/* Phone Login Form */}
                            {formData.loginMethod === "phone" && (
                                <form onSubmit={handlePhoneLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            disabled={otpSent}
                                            className="input-base disabled:bg-neutral-100"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {otpSent && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                    Enter OTP
                                                </label>
                                                <input
                                                    type="text"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                    maxLength={6}
                                                    className="input-base"
                                                    placeholder="Enter 6-digit OTP"
                                                />
                                            </div>
                                            <p className="text-sm text-neutral-600">
                                                OTP sent to {formData.phone}
                                                <button
                                                    type="button"
                                                    onClick={() => setOtpSent(false)}
                                                    className="text-primary-600 hover:text-primary-700 ml-2"
                                                >
                                                    Change number
                                                </button>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Remember Me checkbox for phone login */}
                                    <div className="flex items-center">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                                            />
                                            <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                                        </label>
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
                                                {otpSent ? "Verifying..." : "Sending OTP..."}
                                            </div>
                                        ) : (
                                            otpSent ? "Verify & Sign In" : "Send OTP"
                                        )}
                                    </motion.button>
                                </form>
                            )}

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-neutral-200"></div>
                                <span className="px-4 text-sm text-neutral-500">or</span>
                                <div className="flex-1 border-t border-neutral-200"></div>
                            </div>

                            {/* Social Login */}
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center py-3 px-4 border-2 border-neutral-200 rounded-2xl hover:border-neutral-300 transition-colors">
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center mt-8">
                                <p className="text-neutral-600">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="text-primary-600 font-semibold hover:text-primary-700">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
