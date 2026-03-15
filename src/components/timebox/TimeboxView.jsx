import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TimeBlock from './TimeBlock'
import Timeline from './Timeline'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { hasOverlap } from '@/utils/time'

export default function TimeboxView({ tasks, priorities, timeblocks, setTimeblocks, onBack, onNext }) {
  const handleUpdateBlock = (index, updated) => {
    setTimeblocks(prev => prev.map((b, i) => i === index ? updated : b))
  }

  const allAssigned = timeblocks.length === 3 && timeblocks.every(b => b.startTime && b.endTime)
  const overlap = hasOverlap(timeblocks)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-none md:border md:shadow-sm">
          <CardHeader className="text-center md:text-left pb-4">
            <div className="mx-auto md:mx-0 mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl md:text-2xl">타임박스 설정</CardTitle>
            <CardDescription>
              각 태스크에 시간을 할당하세요. (15분 단위)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorities.map((p, i) => {
              const task = tasks.find(t => t.id === p.taskId)
              if (!task) return null
              return (
                <TimeBlock
                  key={p.taskId}
                  index={i}
                  task={task}
                  block={timeblocks[i] || { taskId: p.taskId, startTime: '', endTime: '' }}
                  onUpdate={handleUpdateBlock}
                />
              )
            })}
            {overlap && (
              <p className="text-xs text-destructive font-medium">
                시간이 겹칩니다. 조정해주세요.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="hidden md:block">
          <Timeline timeblocks={timeblocks} tasks={tasks} priorities={priorities} />
        </div>
      </div>

      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t md:border-0 md:bg-transparent md:backdrop-blur-none">
        <div className="flex gap-2 justify-between md:justify-end">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전
          </Button>
          <Button
            size="lg"
            disabled={!allAssigned || overlap}
            onClick={onNext}
          >
            실행 시작
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
