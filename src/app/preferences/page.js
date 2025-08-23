"use client";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { preferencesCookies, themeCookies, cookieUtils } from '@/utils/cookies';
import Navbar from '@/components/Navbar';

export default function PreferencesPage() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: 'en',
        currency: 'INR',
        notifications: true,
        emailUpdates: true
    });
    const [cookieConsent, setCookieConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load current preferences
        const currentPrefs = preferencesCookies.getPreferences();
        const currentTheme = themeCookies.getTheme();
        const hasConsent = cookieUtils.hasConsent();
        
        setPreferences({
            ...currentPrefs,
            theme: currentTheme
        });
        setCookieConsent(hasConsent);
    }, []);

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSavePreferences = async () => {
        setLoading(true);
        
        try {
            // Save preferences to cookies
            const { theme, ...otherPrefs } = preferences;
            preferencesCookies.setPreferences(otherPrefs);
            themeCookies.setTheme(theme);
            
            // Apply theme immediately
            document.documentElement.setAttribute('data-theme', theme);
            
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCookieConsentChange = (consent) => {
        setCookieConsent(consent);
        cookieUtils.setConsent(consent);
        
        if (!consent) {
            // If user declines, clear all preferences
            setPreferences({
                theme: 'light',
                language: 'en',
                currency: 'INR',
                notifications: true,
                emailUpdates: true
            });
        }
    };

    const clearAllData = () => {
        if (window.confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
            cookieUtils.clearAllCookies();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
            <Navbar />
            
            <div className="pt-24 pb-16">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-luxury p-8"
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                                Preferences & Privacy
                            </h1>
                            <p className="text-neutral-600">
                                Manage your account preferences and privacy settings
                            </p>
                        </div>

                        {/* Cookie Consent Section */}
                        <div className="mb-8 p-6 bg-neutral-50 rounded-2xl">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                                🍪 Cookie Preferences
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">Allow Cookies</h3>
                                        <p className="text-sm text-neutral-600">
                                            Enable cookies for login persistence and better experience
                                        </p>
                                    </div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={cookieConsent}
                                            onChange={(e) => handleCookieConsentChange(e.target.checked)}
                                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                        />
                                    </label>
                                </div>
                                
                                <button
                                    onClick={clearAllData}
                                    className="text-sm text-red-600 hover:text-red-700 underline"
                                >
                                    Clear all stored data
                                </button>
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-neutral-900">
                                Display Preferences
                            </h2>

                            {/* Theme */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Theme
                                    </label>
                                    <select
                                        value={preferences.theme}
                                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                                        className="input-base"
                                        disabled={!cookieConsent}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto (System)</option>
                                    </select>
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Language
                                    </label>
                                    <select
                                        value={preferences.language}
                                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                        className="input-base"
                                        disabled={!cookieConsent}
                                    >
                                        <option value="en">English</option>
                                        <option value="hi">हिंदी (Hindi)</option>
                                        <option value="bn">বাংলা (Bengali)</option>
                                        <option value="ta">தமிழ் (Tamil)</option>
                                    </select>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Currency
                                    </label>
                                    <select
                                        value={preferences.currency}
                                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                                        className="input-base"
                                        disabled={!cookieConsent}
                                    >
                                        <option value="INR">₹ Indian Rupee (INR)</option>
                                        <option value="USD">$ US Dollar (USD)</option>
                                        <option value="EUR">€ Euro (EUR)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-neutral-900">
                                    Notification Preferences
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-neutral-900">Push Notifications</h4>
                                            <p className="text-sm text-neutral-600">
                                                Get notified about order updates and new products
                                            </p>
                                        </div>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications}
                                                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                                disabled={!cookieConsent}
                                            />
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-neutral-900">Email Updates</h4>
                                            <p className="text-sm text-neutral-600">
                                                Receive newsletters and promotional offers
                                            </p>
                                        </div>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.emailUpdates}
                                                onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                                disabled={!cookieConsent}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-6 border-t border-neutral-200">
                                <motion.button
                                    onClick={handleSavePreferences}
                                    disabled={loading || !cookieConsent}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Saving...
                                        </>
                                    ) : saved ? (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Saved!
                                        </>
                                    ) : (
                                        'Save Preferences'
                                    )}
                                </motion.button>
                                
                                {!cookieConsent && (
                                    <p className="text-sm text-neutral-500 mt-2">
                                        Enable cookies to save your preferences
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
