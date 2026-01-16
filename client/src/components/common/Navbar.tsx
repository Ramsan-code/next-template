'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <Link href="/" className="font-bold text-2xl">
                    NearTailors
                </Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                                Dashboard
                            </Link>
                            <Button variant="ghost" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
