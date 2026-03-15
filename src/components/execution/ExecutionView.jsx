import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ExecutionTask from './ExecutionTask'
import ExecutionSummary from './ExecutionSummary'
import { ArrowLeft, Trophy, Zap } from 'lucide-react'

export default function ExecutionView({ tasks, priorities, timeblocks, executions, setExecutions, onBack, onReset }) {
  const [showSummary, setShowSummary] = useState(false)

  const handleUpdateExecution = (index, updated) => {
    setExecutions(prev => prev.map((e, i) => i === index ? updated : e))
  }

  const allDone = executions.length === 3 && executions.every(e => e.status === 'done')
  const anyStarted = executions.some(e => e.status !== 'idle')

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl md:text-2xl">계획 실행</CardTitle>
          <CardDescription>
            타이머를 시작하고 실제 소요시간을 측정하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {priorities.map((p, i) => {
            const task = tasks.find(t => t.id === p.taskId)
            if (!task) return null
            return (
              <ExecutionTask
                key={p.taskId}
                index={i}
                task={task}
                block={timeblocks[i] || { startTime: '', endTime: '' }}
                execution={executions[i] || { taskId: p.taskId, totalElapsed: 0, status: 'idle' }}
                onUpdate={(updated) => handleUpdateExecution(i, updated)}
              />
            )
          })}
        </CardContent>
      </Card>

      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t md:border-0 md:bg-transparent md:backdrop-blur-none">
        <div className="flex gap-2 justify-between md:justify-end">
          <Button variant="outline" onClick={onBack} disabled={anyStarted && !allDone}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전
          </Button>
          <Button
            size="lg"
            disabled={!allDone}
            onClick={() => setShowSummary(true)}
          >
            <Trophy className="mr-2 h-4 w-4" />
            결과 보기
          </Button>
        </div>
      </div>

      <ExecutionSummary
        open={showSummary}
        onClose={() => setShowSummary(false)}
        timeblocks={timeblocks}
        tasks={tasks}
        executions={executions}
        onReset={onReset}
      />
    </div>
  )
}
