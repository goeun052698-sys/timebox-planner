import { useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useStepNavigation } from '@/hooks/useStepNavigation'
import { useTasks } from '@/hooks/useTasks'
import Header from '@/components/layout/Header'
import StepIndicator from '@/components/layout/StepIndicator'
import BrainDump from '@/components/braindump/BrainDump'
import PriorityPicker from '@/components/priority/PriorityPicker'
import TimeboxView from '@/components/timebox/TimeboxView'
import ExecutionView from '@/components/execution/ExecutionView'

function App() {
  const [currentStep, setCurrentStep] = useLocalStorage('timebox-step', 1)
  const [tasks, setTasks] = useLocalStorage('timebox-tasks', [])
  const [priorities, setPriorities] = useLocalStorage('timebox-priorities', [])
  const [timeblocks, setTimeblocks] = useLocalStorage('timebox-timeblocks', [])
  const [executions, setExecutions] = useLocalStorage('timebox-executions', [])

  const { addTask, removeTask, updateTask } = useTasks(tasks, setTasks)
  const { canGoNext, goNext, goBack } = useStepNavigation(currentStep, setCurrentStep, { tasks, priorities, timeblocks })

  // Sync timeblocks when priorities change
  useEffect(() => {
    if (priorities.length > 0) {
      setTimeblocks(prev => {
        return priorities.map((p) => {
          const existing = prev.find(b => b.taskId === p.taskId)
          return existing || { taskId: p.taskId, startTime: '', endTime: '' }
        })
      })
    }
  }, [priorities, setTimeblocks])

  // Init executions when entering step 4
  useEffect(() => {
    if (currentStep === 4 && priorities.length === 3) {
      setExecutions(prev => {
        if (prev.length === 3 && prev.every(e => priorities.some(p => p.taskId === e.taskId))) {
          return prev // already initialized for these tasks
        }
        return priorities.map(p => ({
          taskId: p.taskId,
          startedAt: null,
          totalElapsed: 0,
          status: 'idle',
        }))
      })
    }
  }, [currentStep, priorities, setExecutions])

  // Handle step back - clear downstream data
  const handleBack = useCallback(() => {
    if (currentStep === 2) {
      setPriorities([])
      setTimeblocks([])
    } else if (currentStep === 3) {
      setTimeblocks(prev => prev.map(b => ({ ...b, startTime: '', endTime: '' })))
    } else if (currentStep === 4) {
      setExecutions([])
    }
    goBack()
  }, [currentStep, goBack, setPriorities, setTimeblocks, setExecutions])

  // Handle removing a task - also remove from priorities
  const handleRemoveTask = useCallback((id) => {
    removeTask(id)
    setPriorities(prev => {
      const next = prev.filter(p => p.taskId !== id)
      return next.map((p, i) => ({ ...p, rank: i + 1 }))
    })
  }, [removeTask, setPriorities])

  const handleReset = useCallback(() => {
    setCurrentStep(1)
    setTasks([])
    setPriorities([])
    setTimeblocks([])
    setExecutions([])
  }, [setCurrentStep, setTasks, setPriorities, setTimeblocks, setExecutions])

  const handleGoToExecution = useCallback(() => {
    setCurrentStep(4)
  }, [setCurrentStep])

  // Hash sync
  useEffect(() => {
    window.location.hash = `step-${currentStep}`
  }, [currentStep])

  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash.match(/step-(\d)/)
      if (match) {
        const step = Number(match[1])
        if (step >= 1 && step <= 4) setCurrentStep(step)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [setCurrentStep])

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <StepIndicator currentStep={currentStep} />
      <main className="flex-1 px-4 pb-4 md:px-6 mx-auto w-full max-w-3xl">
        <div className="transition-opacity duration-200">
          {currentStep === 1 && (
            <BrainDump
              tasks={tasks}
              addTask={addTask}
              removeTask={handleRemoveTask}
              updateTask={updateTask}
              canGoNext={canGoNext}
              onNext={goNext}
            />
          )}
          {currentStep === 2 && (
            <PriorityPicker
              tasks={tasks}
              priorities={priorities}
              setPriorities={setPriorities}
              canGoNext={canGoNext}
              onNext={goNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <TimeboxView
              tasks={tasks}
              priorities={priorities}
              timeblocks={timeblocks}
              setTimeblocks={setTimeblocks}
              onBack={handleBack}
              onNext={handleGoToExecution}
            />
          )}
          {currentStep === 4 && (
            <ExecutionView
              tasks={tasks}
              priorities={priorities}
              timeblocks={timeblocks}
              executions={executions}
              setExecutions={setExecutions}
              onBack={handleBack}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
