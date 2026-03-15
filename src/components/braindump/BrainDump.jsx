import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import TaskInput from './TaskInput'
import TaskItem from './TaskItem'
import { ArrowRight, Brain } from 'lucide-react'

export default function BrainDump({ tasks, addTask, removeTask, updateTask, canGoNext, onNext }) {
  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl md:text-2xl">브레인 덤프</CardTitle>
          <CardDescription>
            머릿속의 할 일을 모두 쏟아내세요. 판단하지 말고 적으세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TaskInput onAdd={addTask} />
          <div className="flex items-center justify-between">
            <Badge variant={tasks.length >= 3 ? "default" : "secondary"}>
              {tasks.length}개 항목
            </Badge>
            {tasks.length < 3 && (
              <span className="text-xs text-muted-foreground">
                최소 3개 필요 (나머지 {3 - tasks.length}개)
              </span>
            )}
          </div>
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onRemove={removeTask}
              />
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                아직 항목이 없습니다. 위에 할 일을 입력해보세요!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t md:border-0 md:bg-transparent md:backdrop-blur-none">
        <Button
          className="w-full md:w-auto md:float-right"
          size="lg"
          disabled={!canGoNext()}
          onClick={onNext}
        >
          우선순위 선택
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
