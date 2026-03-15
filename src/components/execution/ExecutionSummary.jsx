import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { timeToMinutes, PRIORITY_COLORS } from '@/utils/time'
import { formatElapsed } from '@/hooks/useTimer'
import { Trophy, RotateCcw, ArrowDown, ArrowUp, Minus } from 'lucide-react'

export default function ExecutionSummary({ open, onClose, timeblocks, tasks, executions, onReset }) {
  const totalPlannedMinutes = timeblocks.reduce((sum, b) => {
    if (!b.startTime || !b.endTime) return sum
    return sum + (timeToMinutes(b.endTime) - timeToMinutes(b.startTime))
  }, 0)

  const totalActualMs = executions.reduce((sum, e) => sum + (e.totalElapsed || 0), 0)
  const totalActualMinutes = Math.floor(totalActualMs / 60000)

  const diff = totalActualMinutes - totalPlannedMinutes
  const plannedH = Math.floor(totalPlannedMinutes / 60)
  const plannedM = totalPlannedMinutes % 60
  const actualH = Math.floor(totalActualMinutes / 60)
  const actualM = totalActualMinutes % 60

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2">
            <Trophy className="h-10 w-10 text-amber-500" />
          </div>
          <DialogTitle className="text-xl">실행 결과</DialogTitle>
          <DialogDescription>
            계획 vs 실제 소요시간을 비교합니다
          </DialogDescription>
        </DialogHeader>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground mb-1">계획 시간</p>
            <p className="text-lg font-bold">{plannedH}시간 {plannedM}분</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground mb-1">실제 시간</p>
            <p className={cn("text-lg font-bold", diff > 0 ? "text-destructive" : "text-green-600")}>
              {actualH}시간 {actualM}분
            </p>
          </div>
        </div>

        <div className="text-center text-sm">
          {diff > 0 ? (
            <span className="text-destructive flex items-center justify-center gap-1">
              <ArrowUp className="h-4 w-4" />
              계획보다 {diff}분 더 걸렸습니다
            </span>
          ) : diff < 0 ? (
            <span className="text-green-600 flex items-center justify-center gap-1">
              <ArrowDown className="h-4 w-4" />
              계획보다 {Math.abs(diff)}분 빨리 끝냈습니다
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center justify-center gap-1">
              <Minus className="h-4 w-4" />
              계획과 정확히 일치합니다
            </span>
          )}
        </div>

        <Separator />

        <div className="space-y-3 py-2">
          {timeblocks.map((block, i) => {
            const task = tasks.find(t => t.id === block.taskId)
            const exec = executions[i]
            if (!task || !exec) return null
            const planned = block.startTime && block.endTime
              ? timeToMinutes(block.endTime) - timeToMinutes(block.startTime)
              : 0
            const actual = Math.floor((exec.totalElapsed || 0) / 60000)
            const taskDiff = actual - planned
            return (
              <div key={block.taskId} className="flex items-center gap-3">
                <Badge className={cn(PRIORITY_COLORS[i], "text-white border-0 shrink-0")}>
                  {i + 1}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.text}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>계획: {planned}분</span>
                    <span className={cn(
                      "font-medium",
                      taskDiff > 0 ? "text-destructive" : taskDiff < 0 ? "text-green-600" : ""
                    )}>
                      실제: {actual}분
                      {taskDiff !== 0 && ` (${taskDiff > 0 ? '+' : ''}${taskDiff}분)`}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            새로운 계획
          </Button>
          <Button onClick={onClose}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
