export const saveAuthState = (authData) => {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("auth", JSON.stringify(authData));
        } catch (error) {
            console.error("Error saving auth state:", error);
        }
    }
};

export const loadAuthState = () => {
    if (typeof window !== "undefined") {
        try {
            const authData = localStorage.getItem("auth");
            return authData ? JSON.parse(authData) : null;
        } catch (error) {
            console.error("Error loading auth state:", error);
            return null;
        }
    }
    return null;
};

export const clearAuthState = () => {
    if (typeof window !== "undefined") {
        try {
            localStorage.removeItem("auth");
        } catch (error) {
            console.error("Error clearing auth state:", error);
        }
    }
};
