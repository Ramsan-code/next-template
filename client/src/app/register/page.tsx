'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { RegisterSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/common/Navbar';
import * as z from 'zod';
import api from '@/services/api';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const { register } = useAuth();
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        try {
            const { data } = await api.post('/auth/register', values);
            register(data.token, data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12">
                <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold">Create an Account</h1>
                        <p className="text-muted-foreground">Join NearTailors to start your journey</p>
                    </div>
                    {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded">{error}</div>}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input {...form.register('name')} placeholder="John Doe" />
                            {form.formState.errors.name && (
                                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input {...form.register('email')} placeholder="john@example.com" />
                            {form.formState.errors.email && (
                                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">I want to join as a:</label>
                            <select
                                {...form.register('role')}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="customer">Customer</option>
                                <option value="tailor">Tailor (Seller)</option>
                                <option value="deliverer">Deliverer</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input {...form.register('password')} type="password" placeholder="••••••" />
                            {form.formState.errors.password && (
                                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input {...form.register('confirmPassword')} type="password" placeholder="••••••" />
                            {form.formState.errors.confirmPassword && (
                                <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>
                    <div className="text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="underline hover:text-primary">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
