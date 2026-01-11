'use client'

import { useCallback } from 'react'

export function useTTS() {
    const speak = useCallback((text: string, lang: string = 'en-US') => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel()

            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang
            utterance.rate = 0.9
            utterance.pitch = 1.0

            window.speechSynthesis.speak(utterance)
        }
    }, [])

    return { speak }
}
