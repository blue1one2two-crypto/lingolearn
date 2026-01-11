'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface ChoiceQuestionProps {
    question: string
    options: string[]
    correctAnswer: string
    onAnswer: (isCorrect: boolean) => void
}

export const ChoiceQuestion = ({
    question,
    options,
    correctAnswer,
    onAnswer,
}: ChoiceQuestionProps) => {
    return (
        <Card className="w-full max-w-2xl p-10 space-y-10">
            <div className="text-center space-y-2">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest text-primary">
                    Select the correct translation
                </h3>
                <h1 className="text-5xl font-bold">{question}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="h-20 text-lg border border-white/5 rounded-2xl hover:bg-primary/10 hover:border-primary/20 transition-all text-left justify-start px-8 group"
                        onClick={() => onAnswer(option === correctAnswer)}
                    >
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-4 text-xs group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                    </Button>
                ))}
            </div>
        </Card>
    )
}
