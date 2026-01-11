'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const FillQuestion = ({
    chinese,
    correctAnswer,
    onAnswer,
}: {
    chinese: string
    correctAnswer: string
    onAnswer: (isCorrect: boolean) => void
}) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAnswer(value.trim().toLowerCase() === correctAnswer.toLowerCase())
    }

    return (
        <Card className="w-full max-w-2xl p-12 space-y-10">
            <div className="text-center space-y-2">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest text-primary">
                    Type the English word
                </h3>
                <h1 className="text-4xl font-bold">{chinese}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    autoFocus
                    className="w-full h-20 bg-white/5 border-2 border-white/5 focus:border-primary/40 rounded-3xl px-8 text-2xl font-bold text-center outline-hidden transition-all placeholder:opacity-20"
                    placeholder="Type here..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button className="w-full h-16 text-lg rounded-2xl" disabled={!value.trim()}>
                    Check Answer
                </Button>
            </form>
        </Card>
    )
}
