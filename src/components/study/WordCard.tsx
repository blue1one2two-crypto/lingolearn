'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface WordCardProps {
    word: string
    phonetic?: string
    chinese: string
    example?: string
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSpeak?: () => void
}

export const WordCard = ({
    word,
    phonetic,
    chinese,
    example,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSpeak,
}: WordCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className="relative w-full max-w-sm h-[500px] perspective-1000">
            <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front Side */}
                <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-6 text-center select-none bg-linear-to-br from-white/10 to-white/5">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onSpeak?.()
                        }}
                        className="absolute top-6 right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-primary"
                    >
                        <Volume2 size={24} />
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold tracking-tight">{word}</h1>
                        {phonetic && <p className="text-xl opacity-40 font-mono">{phonetic}</p>}
                    </div>

                    <p className="mt-12 text-sm font-medium opacity-30 uppercase tracking-widest animate-pulse">
                        Click to flip
                    </p>
                </Card>

                {/* Back Side */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center gap-6 text-center select-none bg-linear-to-br from-primary/10 to-accent/10 border-primary/20">
                    <div className="space-y-4 px-6">
                        <h2 className="text-3xl font-bold text-primary">{chinese}</h2>
                        {example && (
                            <p className="text-lg opacity-80 leading-relaxed italic">
                                "{example}"
                            </p>
                        )}
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
