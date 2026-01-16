'use client';

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 bg-card rounded-lg border shadow-sm">
                        <h3 className="font-semibold text-lg mb-2">Welcome, {user.name}</h3>
                        <p className="text-muted-foreground capitalize">Role: {user.role}</p>
                    </div>
                    {/* Add more dashboard widgets here based on role */}
                </div>
            </main>
        </div>
    );
}
