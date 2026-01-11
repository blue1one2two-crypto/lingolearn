export interface SM2Result {
    easeFactor: number
    interval: number
    repetitions: number
    nextReviewDate: Date
}

/**
 * SM-2 Review Algorithm
 * @param quality 0-5, user's response quality (0=completely forgot, 5=perfect recall)
 * @param easeFactor current ease factor (default 2.5)
 * @param interval current interval in days
 * @param repetitions current number of successful repetitions
 */
export function calculateSM2(
    quality: number,
    easeFactor: number = 2.5,
    interval: number = 0,
    repetitions: number = 0
): SM2Result {
    let newEaseFactor = easeFactor
    let newInterval = interval
    let newRepetitions = repetitions

    // Step 1: Calculate new Ease Factor
    // Formula: EF' = EF + (0.1 - (5-q)*(0.08 + (5-q)*0.02))
    newEaseFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    )

    // Step 2: Determine new Interval and Repetitions
    if (quality >= 3) {
        // Correct response
        if (newRepetitions === 0) {
            newInterval = 1
        } else if (newRepetitions === 1) {
            newInterval = 6
        } else {
            newInterval = Math.round(interval * newEaseFactor)
        }
        newRepetitions++
    } else {
        // Incorrect response, reset
        newRepetitions = 0
        newInterval = 1
    }

    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)

    return {
        easeFactor: newEaseFactor,
        interval: newInterval,
        repetitions: newRepetitions,
        nextReviewDate,
    }
}
