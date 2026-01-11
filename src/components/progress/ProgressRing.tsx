'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ProgressRingProps {
    progress: number // 0 to 100
    total: number
    current: number
    size?: number
    strokeWidth?: number
}

export const ProgressRing = ({
    progress,
    total,
    current,
    size = 200,
    strokeWidth = 12,
}: ProgressRingProps) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="rotate-[-90deg]" width={size} height={size}>
                {/* Background Circle */}
                <circle
                    className="text-white/5"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Circle */}
                <motion.circle
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
            </svg>

            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{progress}%</span>
                <span className="text-xs font-medium opacity-50 uppercase tracking-wider">
                    {current} / {total} Words
                </span>
            </div>
        </div>
    )
}
