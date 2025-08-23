import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_CONFIG = {
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
};

// Cookie keys
const COOKIE_KEYS = {
    AUTH_TOKEN: 'craftchain_auth_token',
    USER_DATA: 'craftchain_user_data',
    REMEMBER_LOGIN: 'craftchain_remember_login',
    LAST_EMAIL: 'craftchain_last_email',
    LAST_PHONE: 'craftchain_last_phone',
    CART_ITEMS: 'craftchain_cart',
    PREFERENCES: 'craftchain_preferences',
    THEME: 'craftchain_theme'
};

// Auth Cookie Management
export const authCookies = {
    // Set authentication cookies
    setAuthCookies: (userData, rememberMe = false) => {
        const config = {
            ...COOKIE_CONFIG,
            expires: rememberMe ? 30 : 1 // 30 days if remember me, otherwise 1 day
        };

        // Store user data
        Cookies.set(COOKIE_KEYS.USER_DATA, JSON.stringify(userData), config);
        
        // Store remember preference
        if (rememberMe) {
            Cookies.set(COOKIE_KEYS.REMEMBER_LOGIN, 'true', config);
            // Remember last login method
            if (userData.email) {
                Cookies.set(COOKIE_KEYS.LAST_EMAIL, userData.email, config);
            }
            if (userData.phone) {
                Cookies.set(COOKIE_KEYS.LAST_PHONE, userData.phone, config);
            }
        }
        
        console.log('✅ Auth cookies set successfully');
    },

    // Get user data from cookies
    getUserData: () => {
        try {
            const userData = Cookies.get(COOKIE_KEYS.USER_DATA);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error parsing user data from cookies:', error);
            return null;
        }
    },

    // Get last login credentials
    getLastCredentials: () => {
        return {
            email: Cookies.get(COOKIE_KEYS.LAST_EMAIL) || '',
            phone: Cookies.get(COOKIE_KEYS.LAST_PHONE) || '',
            rememberMe: Cookies.get(COOKIE_KEYS.REMEMBER_LOGIN) === 'true'
        };
    },

    // Clear all auth cookies
    clearAuthCookies: () => {
        Cookies.remove(COOKIE_KEYS.AUTH_TOKEN);
        Cookies.remove(COOKIE_KEYS.USER_DATA);
        Cookies.remove(COOKIE_KEYS.REMEMBER_LOGIN);
        // Keep last email/phone for convenience unless user explicitly logs out
        console.log('✅ Auth cookies cleared');
    },

    // Check if user is authenticated via cookies
    isAuthenticated: () => {
        return !!Cookies.get(COOKIE_KEYS.USER_DATA);
    }
};

// Cart Cookie Management
export const cartCookies = {
    // Set cart items
    setCart: (items) => {
        Cookies.set(COOKIE_KEYS.CART_ITEMS, JSON.stringify(items), COOKIE_CONFIG);
    },

    // Get cart items
    getCart: () => {
        try {
            const cart = Cookies.get(COOKIE_KEYS.CART_ITEMS);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error parsing cart from cookies:', error);
            return [];
        }
    },

    // Add item to cart
    addToCart: (item) => {
        const cart = cartCookies.getCart();
        const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingIndex >= 0) {
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        cartCookies.setCart(cart);
        return cart;
    },

    // Remove item from cart
    removeFromCart: (itemId) => {
        const cart = cartCookies.getCart();
        const updatedCart = cart.filter(item => item.id !== itemId);
        cartCookies.setCart(updatedCart);
        return updatedCart;
    },

    // Clear cart
    clearCart: () => {
        Cookies.remove(COOKIE_KEYS.CART_ITEMS);
    }
};

// Preferences Cookie Management
export const preferencesCookies = {
    // Set user preferences
    setPreferences: (preferences) => {
        Cookies.set(COOKIE_KEYS.PREFERENCES, JSON.stringify(preferences), COOKIE_CONFIG);
    },

    // Get user preferences
    getPreferences: () => {
        try {
            const prefs = Cookies.get(COOKIE_KEYS.PREFERENCES);
            return prefs ? JSON.parse(prefs) : {
                theme: 'light',
                language: 'en',
                currency: 'INR',
                notifications: true,
                emailUpdates: true
            };
        } catch (error) {
            console.error('Error parsing preferences from cookies:', error);
            return {};
        }
    },

    // Update specific preference
    updatePreference: (key, value) => {
        const prefs = preferencesCookies.getPreferences();
        prefs[key] = value;
        preferencesCookies.setPreferences(prefs);
    }
};

// Theme Cookie Management
export const themeCookies = {
    // Set theme
    setTheme: (theme) => {
        Cookies.set(COOKIE_KEYS.THEME, theme, COOKIE_CONFIG);
    },

    // Get theme
    getTheme: () => {
        return Cookies.get(COOKIE_KEYS.THEME) || 'light';
    }
};

// General Cookie Utilities
export const cookieUtils = {
    // Get all CraftChain cookies
    getAllCookies: () => {
        const allCookies = Cookies.get();
        const craftChainCookies = {};
        
        Object.keys(allCookies).forEach(key => {
            if (key.startsWith('craftchain_')) {
                craftChainCookies[key] = allCookies[key];
            }
        });
        
        return craftChainCookies;
    },

    // Clear all CraftChain cookies
    clearAllCookies: () => {
        Object.values(COOKIE_KEYS).forEach(key => {
            Cookies.remove(key);
        });
        console.log('✅ All CraftChain cookies cleared');
    },

    // Check cookie consent (for GDPR compliance)
    hasConsent: () => {
        return Cookies.get('craftchain_cookie_consent') === 'true';
    },

    // Set cookie consent
    setConsent: (consent) => {
        if (consent) {
            Cookies.set('craftchain_cookie_consent', 'true', COOKIE_CONFIG);
        } else {
            cookieUtils.clearAllCookies();
        }
    }
};

export default {
    auth: authCookies,
    cart: cartCookies,
    preferences: preferencesCookies,
    theme: themeCookies,
    utils: cookieUtils
};
