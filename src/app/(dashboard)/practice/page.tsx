'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChoiceQuestion } from '@/components/practice/ChoiceQuestion'
import { FillQuestion } from '@/components/practice/FillQuestion'
import { ListeningQuestion } from '@/components/practice/ListeningQuestion'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

// Mock question data
const MOCK_QUESTIONS = [
    {
        id: '1',
        type: 'choice',
        question: 'abandon',
        options: ['放弃', '获得', '加速', '相信'],
        correctAnswer: '放弃',
    },
    {
        id: '2',
        type: 'fill',
        chinese: '能力；才能',
        correctAnswer: 'ability',
    },
    {
        id: '3',
        type: 'listening',
        word: 'academic',
        options: ['academic', 'academy', 'accurate', 'accuse'],
        correctAnswer: 'academic',
    }
]

export default function PracticePage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
    const [results, setResults] = useState<{ id: string; isCorrect: boolean }[]>([])

    const currentQuestion = MOCK_QUESTIONS[currentIndex]
    const isFinished = currentIndex >= MOCK_QUESTIONS.length

    const handleAnswer = useCallback((isCorrect: boolean) => {
        setFeedback(isCorrect ? 'correct' : 'incorrect')
        setResults(prev => [...prev, { id: currentQuestion.id, isCorrect }])

        setTimeout(() => {
            setFeedback(null)
            setCurrentIndex(prev => prev + 1)
        }, 1500)
    }, [currentQuestion.id])

    if (isFinished) {
        const correctCount = results.filter(r => r.isCorrect).length
        return (
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center h-[70vh] text-center space-y-8">
                <div className="relative">
                    <CheckCircle2 size={120} className="text-success opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">{Math.round((correctCount / MOCK_QUESTIONS.length) * 100)}%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Quiz Completed!</h1>
                    <p className="text-foreground/60 text-lg">
                        You got {correctCount} out of {MOCK_QUESTIONS.length} questions correct.
                    </p>
                </div>
                <Link href="/">
                    <Button className="px-12 h-14 text-lg rounded-2xl">Return Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col">
            <header className="flex items-center justify-between">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ChevronLeft size={16} />
                        Back
                    </Button>
                </Link>
                <div className="h-2 flex-1 mx-8 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-linear-to-r from-primary to-accent"
                        animate={{ width: `${(currentIndex / MOCK_QUESTIONS.length) * 100}%` }}
                    />
                </div>
                <div className="text-sm font-medium opacity-40">
                    {currentIndex + 1} / {MOCK_QUESTIONS.length}
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center pt-10 relative">
                <AnimatePresence mode="wait">
                    {!feedback ? (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full flex justify-center"
                        >
                            {currentQuestion.type === 'choice' && (
                                <ChoiceQuestion
                                    question={currentQuestion.question!}
                                    options={currentQuestion.options!}
                                    correctAnswer={currentQuestion.correctAnswer}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {currentQuestion.type === 'fill' && (
                                <FillQuestion
                                    chinese={currentQuestion.chinese!}
                                    correctAnswer={currentQuestion.correctAnswer}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {currentQuestion.type === 'listening' && (
                                <ListeningQuestion
                                    word={currentQuestion.word!}
                                    options={currentQuestion.options!}
                                    correctAnswer={currentQuestion.correctAnswer}
                                    onAnswer={handleAnswer}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-6"
                        >
                            {feedback === 'correct' ? (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        className="w-32 h-32 rounded-full bg-success/20 flex items-center justify-center text-success"
                                    >
                                        <CheckCircle2 size={64} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-success italic tracking-tight">Excellent!</h2>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        animate={{ x: [-10, 10, -10, 10, 0] }}
                                        className="w-32 h-32 rounded-full bg-error/20 flex items-center justify-center text-error"
                                    >
                                        <XCircle size={64} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-error italic tracking-tight">Keep Going!</h2>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
