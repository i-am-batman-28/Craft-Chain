"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/redux/features/authSlice';

export default function AuthInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Initialize auth state from cookies when the app loads
        console.log('🔄 AuthInitializer: Initializing auth state from cookies...');
        dispatch(initializeAuth());
    }, [dispatch]);

    // This component doesn't render anything
    return null;
}
