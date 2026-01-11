'use client'

import { StudyChart } from '@/components/progress/StudyChart'
import { Card } from '@/components/ui/Card'
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const PIE_DATA = [
    { name: 'Mastered', value: 450, color: '#10b981' },
    { name: 'Learning', value: 320, color: '#0ea5e9' },
    { name: 'New', value: 230, color: '#14b8a6' },
]

export default function ProgressPage() {
    return (
        <div className="space-y-8 pb-10">
            <header>
                <h1 className="text-4xl font-bold">Your Progress</h1>
                <p className="text-foreground/60">Visualize your language learning journey.</p>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Words Mastered', value: '450', icon: Trophy, color: 'text-primary' },
                    { label: 'Study Sessions', value: '86', icon: Target, color: 'text-accent' },
                    { label: 'Accuracy Rate', value: '92%', icon: TrendingUp, color: 'text-success' },
                    { label: 'Total Time', value: '24h', icon: Calendar, color: 'text-warning' },
                ].map((stat, i) => (
                    <Card key={i} className="flex items-center gap-4 p-6 hover:scale-[1.02] transition-transform">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-medium opacity-50 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Chart */}
                <div className="lg:col-span-2">
                    <StudyChart />
                </div>

                {/* Vocabulary Breakdown (Pie Chart) */}
                <Card className="p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold">Vocabulary Split</h3>
                        <p className="text-sm opacity-50">Mastery distribution</p>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={PIE_DATA}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {PIE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        {PIE_DATA.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-medium opacity-80">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Achievement Wall Placeholder */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Unlock Achievements</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="aspect-square flex flex-col items-center justify-center gap-3 p-4 opacity-30 grayscale cursor-not-allowed hover:opacity-40 transition-opacity">
                            <Trophy size={32} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Locked</span>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
