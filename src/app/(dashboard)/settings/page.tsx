'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    User,
    Bell,
    Volume2,
    Moon,
    LogOut,
    Trash2,
    ChevronRight,
    Shield
} from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-10">
            <header>
                <h1 className="text-4xl font-bold">Settings</h1>
                <p className="text-foreground/60">Manage your account and preferences.</p>
            </header>

            {/* Account Section */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest px-2">Account</h3>
                <Card className="divide-y divide-white/5 p-0 overflow-hidden">
                    <div className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer group transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Profile Information</span>
                                <span className="text-xs opacity-50">learner@example.com</span>
                            </div>
                        </div>
                        <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer group transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <Shield size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Privacy & Security</span>
                                <span className="text-xs opacity-50">Password, OAuth, Permissions</span>
                            </div>
                        </div>
                        <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Card>
            </section>

            {/* Preferences Section */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest px-2">Preferences</h3>
                <Card className="divide-y divide-white/5 p-0 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <Bell size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Daily Reminders</span>
                                <span className="text-xs opacity-50">8:00 AM Every day</span>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-primary/40 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <Volume2 size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Auto-play Pronunciation</span>
                                <span className="text-xs opacity-50">Play audio when card flips</span>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <Moon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Dark Mode</span>
                                <span className="text-xs opacity-50">Switch appearance</span>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-primary/40 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </div>
                    </div>
                </Card>
            </section>

            {/* Danger Zone */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest px-2 text-error">Danger Zone</h3>
                <Card className="divide-y divide-white/5 p-0 overflow-hidden border-error/20 bg-error/5">
                    <Button variant="ghost" className="w-full text-left justify-start p-4 hover:bg-error/10 text-error rounded-none border-0">
                        <LogOut size={20} className="mr-4" />
                        <span className="font-semibold">Sign Out</span>
                    </Button>
                    <Button variant="ghost" className="w-full text-left justify-start p-4 hover:bg-error/20 text-error rounded-none border-0">
                        <Trash2 size={20} className="mr-4" />
                        <span className="font-semibold">Reset All Progress</span>
                    </Button>
                </Card>
            </section>

            <div className="text-center opacity-20 py-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em]">LingoLearn Web v1.0.0</p>
            </div>
        </div>
    )
}
