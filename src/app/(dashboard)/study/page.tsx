'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WordCard } from '@/components/study/WordCard'
import { Button } from '@/components/ui/Button'
import { useTTS } from '@/hooks/useTTS'
import { calculateSM2 } from '@/lib/algorithms/sm2'
import { ChevronLeft, Info } from 'lucide-react'
import Link from 'next/link'

// Mock initial data
const INITIAL_WORDS = [
    {
        id: '1',
        english: 'abandon',
        phonetic: '/əˈbændən/',
        chinese: 'v. 放弃；抛弃',
        example: 'They had to abandon their home because of the flood.',
    },
    {
        id: '2',
        english: 'ability',
        phonetic: '/əˈbɪləti/',
        chinese: 'n. 能力；才能',
        example: 'She has the ability to speak three languages.',
    },
    {
        id: '3',
        english: 'academic',
        phonetic: '/ˌækəˈdemɪk/',
        chinese: 'adj. 学院的；学术的',
        example: 'He has an impressive academic record.',
    }
]

export default function StudyPage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const { speak } = useTTS()

    const currentWord = INITIAL_WORDS[currentIndex]
    const isLastWord = currentIndex === INITIAL_WORDS.length - 1

    const handleQualityResponse = useCallback((quality: number) => {
        // In a real app, this would update the database using SM-2
        // const result = calculateSM2(quality, ...)
        // await supabase.from('user_words').upsert(...)

        if (!isLastWord) {
            setDirection(1)
            setCurrentIndex(prev => prev + 1)
        } else {
            // Handle session completion
            alert('Session completed! In a real app, results would be saved.')
        }
    }, [isLastWord])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.8,
        }),
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col">
            <header className="flex items-center justify-between">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ChevronLeft size={16} />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 text-sm font-medium">
                    <span className="text-primary">{currentIndex + 1}</span>
                    <span className="opacity-30">/</span>
                    <span className="opacity-60">{INITIAL_WORDS.length}</span>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center gap-12 pt-10">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full flex justify-center"
                    >
                        <WordCard
                            word={currentWord.english}
                            phonetic={currentWord.phonetic}
                            chinese={currentWord.chinese}
                            example={currentWord.example}
                            onSpeak={() => speak(currentWord.english)}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Quality Controls (SM-2 Buttons) */}
                <div className="grid grid-cols-5 gap-3 w-full max-w-sm">
                    {[1, 2, 3, 4, 5].map((q) => (
                        <Button
                            key={q}
                            variant={q >= 4 ? 'primary' : q === 3 ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => handleQualityResponse(q)}
                            className="h-12 rounded-xl"
                        >
                            {q}
                        </Button>
                    ))}
                </div>

                <p className="text-sm opacity-40 flex items-center gap-2">
                    <Info size={14} />
                    Rate your recall (1: Hardest, 5: Easiest)
                </p>
            </div>
        </div>
    )
}
