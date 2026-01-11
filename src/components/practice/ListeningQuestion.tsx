'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useTTS } from '@/hooks/useTTS'
import { Volume2 } from 'lucide-react'

export const ListeningQuestion = ({
    word,
    options,
    correctAnswer,
    onAnswer,
}: {
    word: string
    options: string[]
    correctAnswer: string
    onAnswer: (isCorrect: boolean) => void
}) => {
    const { speak } = useTTS()

    return (
        <Card className="w-full max-w-2xl p-12 space-y-10">
            <div className="text-center space-y-6">
                <h3 className="text-sm font-medium opacity-40 uppercase tracking-widest text-primary">
                    Listen and select the word
                </h3>
                <Button
                    size="lg"
                    variant="secondary"
                    className="w-32 h-32 rounded-full mx-auto shadow-2xl shadow-accent/20"
                    onClick={() => speak(word)}
                >
                    <Volume2 size={48} />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="h-20 text-lg border border-white/5 rounded-2xl hover:bg-accent/10 hover:border-accent/20 transition-all font-bold"
                        onClick={() => onAnswer(option === correctAnswer)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </Card>
    )
}
