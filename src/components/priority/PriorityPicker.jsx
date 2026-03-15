import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import SelectedSlots from './SelectedSlots'
import SelectableTask from './SelectableTask'
import { ArrowLeft, ArrowRight, Target } from 'lucide-react'

export default function PriorityPicker({ tasks, priorities, setPriorities, canGoNext, onNext, onBack }) {
  const selectedIds = priorities.map(p => p.taskId)

  const handleSelect = (taskId) => {
    if (priorities.length >= 3) return
    setPriorities(prev => [...prev, { rank: prev.length + 1, taskId }])
  }

  const handleRemove = (index) => {
    setPriorities(prev => {
      const next = prev.filter((_, i) => i !== index)
      return next.map((p, i) => ({ ...p, rank: i + 1 }))
    })
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl md:text-2xl">우선순위 선택</CardTitle>
          <CardDescription>
            오늘 반드시 해야 할 3가지를 골라주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SelectedSlots priorities={priorities} tasks={tasks} onRemove={handleRemove} />
          <Separator />
          <div className="space-y-2 max-h-[40vh] overflow-y-auto">
            {tasks.map(task => (
              <SelectableTask
                key={task.id}
                task={task}
                isSelected={selectedIds.includes(task.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t md:border-0 md:bg-transparent md:backdrop-blur-none">
        <div className="flex gap-2 justify-between md:justify-end">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전
          </Button>
          <Button
            size="lg"
            disabled={!canGoNext()}
            onClick={onNext}
          >
            타임박스 설정
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
