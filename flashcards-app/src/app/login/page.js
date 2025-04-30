'use client';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./LoginForm'), { ssr: false });

export default function LoginPage() {
    return (
        <main className="grid place-items-center min-h-screen">
            <LoginForm />
        </main>
    );
}