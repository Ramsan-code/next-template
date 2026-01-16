'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { LoginSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/common/Navbar';
import * as z from 'zod';
import api from '@/services/api';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
            const { data } = await api.post('/auth/login', values);
            login(data.token, data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">Enter your credentials to access your account</p>
                    </div>
                    {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded">{error}</div>}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input {...form.register('email')} placeholder="john@example.com" />
                            {form.formState.errors.email && (
                                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input {...form.register('password')} type="password" placeholder="••••••" />
                            {form.formState.errors.password && (
                                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                    <div className="text-center text-sm">
                        Don't have an account?{' '}
                        <Link href="/register" className="underline hover:text-primary">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
