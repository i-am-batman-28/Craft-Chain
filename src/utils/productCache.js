// Advanced client-side caching for products
class ProductCache {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
        this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
        this.LOCAL_STORAGE_KEY = 'craftchain_products_cache';
        this.LOCAL_STORAGE_TIMESTAMP_KEY = 'craftchain_products_timestamp';
        
        // Load from localStorage on initialization
        this.loadFromLocalStorage();
    }

    // Load cached data from localStorage
    loadFromLocalStorage() {
        try {
            // Check if we're in the browser
            if (typeof window === 'undefined' || !window.localStorage) {
                return;
            }
            
            const cached = localStorage.getItem(this.LOCAL_STORAGE_KEY);
            const timestamp = localStorage.getItem(this.LOCAL_STORAGE_TIMESTAMP_KEY);
            
            if (cached && timestamp) {
                const age = Date.now() - parseInt(timestamp);
                if (age < this.CACHE_DURATION) {
                    const products = JSON.parse(cached);
                    this.cache.set('products_all', products);
                    this.timestamps.set('products_all', parseInt(timestamp));
                    console.log('📦 Loaded products from localStorage cache');
                }
            }
        } catch (error) {
            console.warn('Failed to load from localStorage cache:', error);
        }
    }

    // Save to localStorage
    saveToLocalStorage(key, data) {
        try {
            // Check if we're in the browser
            if (typeof window === 'undefined' || !window.localStorage) {
                return;
            }
            
            if (key === 'products_all') {
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
                localStorage.setItem(this.LOCAL_STORAGE_TIMESTAMP_KEY, Date.now().toString());
            }
        } catch (error) {
            console.warn('Failed to save to localStorage cache:', error);
        }
    }

    // Check if data is cached and fresh
    has(key) {
        if (!this.cache.has(key)) return false;
        
        const timestamp = this.timestamps.get(key);
        const age = Date.now() - timestamp;
        
        if (age > this.CACHE_DURATION) {
            this.cache.delete(key);
            this.timestamps.delete(key);
            return false;
        }
        
        return true;
    }

    // Get cached data
    get(key) {
        if (this.has(key)) {
            console.log(`🚀 Cache HIT for ${key}`);
            return this.cache.get(key);
        }
        console.log(`💾 Cache MISS for ${key}`);
        return null;
    }

    // Set cached data
    set(key, data) {
        this.cache.set(key, data);
        this.timestamps.set(key, Date.now());
        this.saveToLocalStorage(key, data);
        console.log(`💾 Cached ${key} with ${Array.isArray(data) ? data.length : 1} items`);
    }

    // Clear cache
    clear() {
        this.cache.clear();
        this.timestamps.clear();
        
        // Check if we're in the browser
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(this.LOCAL_STORAGE_KEY);
            localStorage.removeItem(this.LOCAL_STORAGE_TIMESTAMP_KEY);
        }
    }

    // Get cache stats
    getStats() {
        return {
            entries: this.cache.size,
            keys: Array.from(this.cache.keys()),
            ages: Array.from(this.timestamps.entries()).map(([key, timestamp]) => ({
                key,
                age: Date.now() - timestamp,
                fresh: (Date.now() - timestamp) < this.CACHE_DURATION
            }))
        };
    }
}

// Singleton instance
const productCache = new ProductCache();

// Enhanced fetch with aggressive caching
export const fetchProductsWithCache = async () => {
    // Try cache first
    const cached = productCache.get('products_all');
    if (cached) {
        return { products: cached, fromCache: true };
    }

    try {
        const response = await fetch('/api/products', {
            headers: {
                'Cache-Control': 'max-age=300', // 5 minutes browser cache
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
            productCache.set('products_all', data.products);
            return { products: data.products, fromCache: false };
        }
        
        return { products: [], fromCache: false };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        
        // Return stale cache if available
        const staleCache = productCache.cache.get('products_all');
        if (staleCache) {
            console.log('🔄 Using stale cache due to fetch error');
            return { products: staleCache, fromCache: true, stale: true };
        }
        
        return { products: [], fromCache: false, error: error.message };
    }
};

// Preload function for even faster loading
export const preloadProducts = () => {
    // Fire and forget - load products in background
    setTimeout(() => {
        fetchProductsWithCache().catch(() => {
            // Silent fail for preload
        });
    }, 100);
};

export default productCache;