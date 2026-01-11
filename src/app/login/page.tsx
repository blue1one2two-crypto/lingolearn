'use client'

import { AuthButton } from '@/components/auth/AuthButton';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-8">
            <div className="max-w-md w-full glass-dark p-12 rounded-3xl text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-linear-to-br from-primary to-accent bg-clip-text text-transparent">
                        LingoLearn
                    </h1>
                    <p className="text-lg opacity-80">
                        Your modern language learning companion.
                    </p>
                </div>

                <div className="pt-4 space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs font-medium opacity-40 uppercase tracking-widest">Sign in to get started</p>
                        <AuthButton />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs opacity-30">
                            By continuing, you agree to our Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
