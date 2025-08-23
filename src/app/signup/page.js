"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { login } from "@/redux/features/authSlice";
import { authCookies } from "@/utils/cookies";
import Navbar from "@/components/Navbar";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        name: "",
        userType: "",
        bio: "",
        signupMethod: "email", // "email" or "phone"
        agreeToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/marketplace");
        }
    }, [isAuthenticated, router]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
        setError("");
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        if (!formData.agreeToTerms) {
            setError("Please agree to terms and conditions");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    userType: formData.userType,
                    bio: formData.bio,
                    method: "email"
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Auto-login after successful signup with remember me enabled
                dispatch(login({ 
                    userData: data.user, 
                    rememberMe: true  // Remember new users by default
                }));
                
                // Redirect based on user type
                const redirectPath = data.user.userType === "artisan" ? "/dashboard" : "/marketplace";
                router.push(redirectPath);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.agreeToTerms) {
            setError("Please agree to terms and conditions");
            setLoading(false);
            return;
        }

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
                setError("Network error. Please try again.");
            }
        } else {
            // Verify OTP and register
            try {
                const response = await fetch("/api/auth/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        phone: formData.phone, 
                        otp: otp,
                        action: "register",
                        userData: {
                            name: formData.name,
                            userType: formData.userType,
                            bio: formData.bio
                        }
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Auto-login after successful signup with remember me enabled
                    dispatch(login({ 
                        userData: data.user, 
                        rememberMe: true  // Remember new users by default
                    }));
                    
                    // Redirect based on user type
                    const redirectPath = data.user.userType === "artisan" ? "/dashboard" : "/marketplace";
                    router.push(redirectPath);
                } else {
                    setError(data.message || "Invalid OTP");
                }
            } catch (error) {
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
                                    Create Account
                                </h1>
                                <p className="text-neutral-600">
                                    Join CraftChain marketplace
                                </p>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center justify-center mb-8">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    step === 1 ? "bg-primary-600 text-white" : "bg-primary-100 text-primary-600"
                                }`}>
                                    1
                                </div>
                                <div className={`w-12 h-1 mx-2 ${
                                    step > 1 ? "bg-primary-600" : "bg-neutral-200"
                                }`}></div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    step === 2 ? "bg-primary-600 text-white" : step > 2 ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-400"
                                }`}>
                                    2
                                </div>
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

                            {step === 1 && (
                                <>
                                    {/* Signup Method Toggle */}
                                    <div className="flex bg-neutral-100 rounded-2xl p-1 mb-6">
                                        <button
                                            onClick={() => {
                                                setFormData({ ...formData, signupMethod: "email" });
                                                setOtpSent(false);
                                                setError("");
                                            }}
                                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                                formData.signupMethod === "email"
                                                    ? "bg-white text-primary-600 shadow-elegant"
                                                    : "text-neutral-600"
                                            }`}
                                        >
                                            Email
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormData({ ...formData, signupMethod: "phone" });
                                                setOtpSent(false);
                                                setError("");
                                            }}
                                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                                formData.signupMethod === "phone"
                                                    ? "bg-white text-primary-600 shadow-elegant"
                                                    : "text-neutral-600"
                                            }`}
                                        >
                                            Phone
                                        </button>
                                    </div>

                                    {/* Email Signup Form */}
                                    {formData.signupMethod === "email" && (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            if (!formData.email || !formData.password || !formData.confirmPassword) {
                                                setError("Please fill all fields");
                                                return;
                                            }
                                            setStep(2);
                                        }} className="space-y-6">
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
                                                    placeholder="Create a password"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="input-base"
                                                    placeholder="Confirm your password"
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-luxury hover:shadow-premium transition-all duration-300"
                                            >
                                                Continue
                                            </motion.button>
                                        </form>
                                    )}

                                    {/* Phone Signup Form */}
                                    {formData.signupMethod === "phone" && (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            if (!formData.phone) {
                                                setError("Please enter phone number");
                                                return;
                                            }
                                            setStep(2);
                                        }} className="space-y-6">
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
                                                    className="input-base"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-luxury hover:shadow-premium transition-all duration-300"
                                            >
                                                Continue
                                            </motion.button>
                                        </form>
                                    )}
                                </>
                            )}

                            {step === 2 && (
                                <form onSubmit={formData.signupMethod === "email" ? handleEmailSignup : handlePhoneSignup} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="input-base"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            I am a...
                                        </label>
                                        <select
                                            name="userType"
                                            value={formData.userType}
                                            onChange={handleInputChange}
                                            required
                                            className="input-base"
                                        >
                                            <option value="">Select your role</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="artisan">Artisan</option>
                                        </select>
                                    </div>

                                    {formData.userType === "artisan" && (
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                Bio (Optional)
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                className="input-base"
                                                rows={3}
                                                placeholder="Tell us about your craft and experience..."
                                            />
                                        </div>
                                    )}

                                    {formData.signupMethod === "phone" && otpSent && (
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
                                            </p>
                                        </motion.div>
                                    )}

                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleInputChange}
                                            required
                                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mt-1"
                                        />
                                        <label className="ml-3 text-sm text-neutral-600">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>

                                    <div className="flex space-x-4">
                                        <motion.button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-4 bg-neutral-100 text-neutral-700 font-semibold rounded-2xl hover:bg-neutral-200 transition-all duration-300"
                                        >
                                            Back
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-luxury hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    {formData.signupMethod === "phone" && otpSent ? "Verifying..." : "Creating..."}
                                                </div>
                                            ) : (
                                                formData.signupMethod === "phone" && !otpSent ? "Send OTP" : "Create Account"
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            )}

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-neutral-200"></div>
                                <span className="px-4 text-sm text-neutral-500">or</span>
                                <div className="flex-1 border-t border-neutral-200"></div>
                            </div>

                            {/* Social Signup */}
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

                            {/* Login Link */}
                            <div className="text-center mt-8">
                                <p className="text-neutral-600">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                                        Sign in
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
