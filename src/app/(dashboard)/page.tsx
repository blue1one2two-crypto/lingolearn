import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressRing } from '@/components/progress/ProgressRing'
import { Flame, Play, RefreshCw, Trophy } from 'lucide-react'

export default function DashboardPage() {
    // Mock data for initial UI verification
    const stats = {
        dailyGoal: 50,
        dailyProgress: 32,
        streak: 12,
        pendingReviews: 145,
    }

    const progressPercentage = Math.round((stats.dailyProgress / stats.dailyGoal) * 100)

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Good Afternoon, Learner!</h2>
                    <p className="text-foreground/60">Ready to master some new words today?</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                    <Flame className="text-orange-500 fill-orange-500" size={24} />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold leading-none">{stats.streak}</span>
                        <span className="text-[10px] font-medium opacity-50 uppercase tracking-widest">Day Streak</span>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Progress Card */}
                <Card className="lg:col-span-2 flex flex-col md:flex-row items-center justify-around gap-8 p-10 bg-linear-to-br from-white/5 to-transparent">
                    <ProgressRing
                        progress={progressPercentage}
                        current={stats.dailyProgress}
                        total={stats.dailyGoal}
                    />
                    <div className="flex flex-col gap-6 text-center md:text-left">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">Today's Progress</h3>
                            <p className="text-foreground/60 max-w-[240px]">
                                You've completed {progressPercentage}% of your daily goal. Keep going!
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Button className="gap-2">
                                <Play size={18} />
                                Continue Learning
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <RefreshCw size={18} />
                                Quick Review
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Quick Stats / Pending Reviews */}
                <div className="space-y-6">
                    <Card className="flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <RefreshCw size={80} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <RefreshCw size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{stats.pendingReviews}</span>
                            <span className="text-sm font-medium opacity-60">Words to Review</span>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Trophy size={80} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <Trophy size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Level 4</span>
                            <span className="text-sm font-medium opacity-60">Current Rank</span>
                        </div>
                    </Card>

                    <Button variant="ghost" className="w-full border border-white/5 rounded-3xl h-16 group">
                        <span className="group-hover:translate-x-1 transition-transform">See All Achievements →</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
