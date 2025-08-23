"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cookieUtils } from '@/utils/cookies';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already given consent
        const hasConsent = cookieUtils.hasConsent();
        setShowBanner(!hasConsent);
    }, []);

    const handleAccept = () => {
        cookieUtils.setConsent(true);
        setShowBanner(false);
    };

    const handleDecline = () => {
        cookieUtils.setConsent(false);
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-2xl"
                >
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                    🍪 We use cookies
                                </h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    We use cookies to enhance your experience, remember your preferences, 
                                    and keep you logged in across sessions. By continuing to use CraftChain, 
                                    you agree to our use of cookies.
                                </p>
                            </div>
                            <div className="flex gap-3 min-w-fit">
                                <button
                                    onClick={handleDecline}
                                    className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 
                                             border border-neutral-300 rounded-lg hover:bg-neutral-50 
                                             transition-colors duration-200"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2 text-sm font-medium text-white bg-primary-600 
                                             hover:bg-primary-700 rounded-lg shadow-sm hover:shadow-md 
                                             transition-all duration-200"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
