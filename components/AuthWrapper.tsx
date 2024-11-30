"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

export default function AuthWrapper({ children }: {children: React.ReactNode}) {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { isAuthenticated, isLoading } = useCurrentUser();

    useEffect(() => {
        if(!isLoading && !isAuthenticated) {
            setShowAuthModal(true);
        }
    }, [isAuthenticated, isLoading]);

    return (
        <>
            {children}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    )
}