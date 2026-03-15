import { useCallback } from 'react'

export function useStepNavigation(currentStep, setCurrentStep, { tasks, priorities, timeblocks }) {
  const canGoNext = useCallback(() => {
    switch (currentStep) {
      case 1:
        return tasks.length >= 3
      case 2:
        return priorities.length === 3
      case 3:
        return timeblocks.length === 3 && timeblocks.every(b => b.startTime && b.endTime)
      default:
        return false
    }
  }, [currentStep, tasks, priorities, timeblocks])

  const goNext = useCallback(() => {
    if (canGoNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }, [canGoNext, currentStep, setCurrentStep])

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep, setCurrentStep])

  return { canGoNext, goNext, goBack }
}
