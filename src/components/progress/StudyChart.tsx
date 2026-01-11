'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts'
import { Card } from '@/components/ui/Card'

const data = [
    { date: 'Mon', count: 45 },
    { date: 'Tue', count: 52 },
    { date: 'Wed', count: 38 },
    { date: 'Thu', count: 65 },
    { date: 'Fri', count: 48 },
    { date: 'Sat', count: 85 },
    { date: 'Sun', count: 72 },
]

export const StudyChart = () => {
    return (
        <Card className="h-[400px] w-full p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold">Learning Activity</h3>
                    <p className="text-sm opacity-50">Words mastered in the last 7 days</p>
                </div>
                <div className="text-2xl font-bold text-primary">+24%</div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff50', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff50', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #ffffff10',
                            borderRadius: '12px',
                            color: '#fff'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#0ea5e9"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCount)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}
