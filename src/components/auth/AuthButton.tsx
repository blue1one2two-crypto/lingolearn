'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Github, Globe } from 'lucide-react'

export function AuthButton() {
    const supabase = createClient()

    const handleLogin = async (provider: 'github' | 'google') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <Button
                onClick={() => handleLogin('github')}
                variant="outline"
                className="gap-3 h-12 w-full border-white/10 hover:bg-white/5"
            >
                <Github size={20} />
                Continue with GitHub
            </Button>
            {/* Google requires more console config, but providing the button as per rules */}
            <Button
                onClick={() => handleLogin('google')}
                variant="outline"
                className="gap-3 h-12 w-full border-white/10 hover:bg-white/5"
            >
                <Globe size={20} />
                Continue with Google
            </Button>
        </div>
    )
}
