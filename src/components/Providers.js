"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthInitializer from "./AuthInitializer";
import CookieBanner from "./CookieBanner";

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
            <CookieBanner />
        </Provider>
    );
}
