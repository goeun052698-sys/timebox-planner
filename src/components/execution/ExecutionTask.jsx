import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PRIORITY_COLORS, PRIORITY_COLORS_LIGHT, PRIORITY_BORDER_COLORS, timeToMinutes } from '@/utils/time'
import { useTimer, formatElapsed } from '@/hooks/useTimer'
import { Play, Pause, CheckCircle2 } from 'lucide-react'

export default function ExecutionTask({ index, task, block, execution, onUpdate }) {
  const { elapsed, running, start, pause, restore } = useTimer()

  const plannedMinutes = block.startTime && block.endTime
    ? timeToMinutes(block.endTime) - timeToMinutes(block.startTime)
    : 0
  const plannedMs = plannedMinutes * 60 * 1000
  const actualMinutes = Math.floor(elapsed / 60000)
  const isDone = execution.status === 'done'
  const overTime = elapsed > plannedMs

  // Restore timer state from saved execution on mount
  useEffect(() => {
    if (execution.totalElapsed > 0) {
      restore(execution.totalElapsed, execution.status === 'running')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync elapsed to parent periodically
  useEffect(() => {
    if (running) {
      const sync = setInterval(() => {
        onUpdate({ ...execution, totalElapsed: elapsed, status: 'running' })
      }, 5000)
      return () => clearInterval(sync)
    }
  }, [running]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    start()
    onUpdate({ ...execution, status: 'running', startedAt: execution.startedAt || Date.now() })
  }

  const handlePause = () => {
    pause()
    onUpdate({ ...execution, totalElapsed: elapsed, status: 'paused' })
  }

  const handleDone = () => {
    pause()
    onUpdate({ ...execution, totalElapsed: elapsed, status: 'done' })
  }

  const progressPercent = plannedMs > 0 ? Math.min((elapsed / plannedMs) * 100, 100) : 0

  return (
    <Card className={cn(
      "p-4 border-2 transition-all",
      isDone ? "opacity-70" : "",
      PRIORITY_COLORS_LIGHT[index],
      PRIORITY_BORDER_COLORS[index]
    )}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Badge className={cn("shrink-0", PRIORITY_COLORS[index], "text-white border-0")}>
            {index + 1}
          </Badge>
          <span className={cn("text-sm font-medium truncate", isDone && "line-through")}>{task.text}</span>
        </div>
        {isDone && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            overTime ? "bg-destructive" : PRIORITY_COLORS[index]
          )}
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">경과 </span>
            <span className={cn(
              "font-mono font-semibold tabular-nums",
              overTime && !isDone && "text-destructive"
            )}>
              {formatElapsed(elapsed)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">계획 </span>
            <span className="font-mono text-muted-foreground">{plannedMinutes}분</span>
          </div>
          {isDone && (
            <div>
              <span className="text-muted-foreground text-xs">실제 </span>
              <span className="font-mono font-semibold">{actualMinutes}분</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!isDone && (
            <>
              {running ? (
                <Button size="sm" variant="outline" onClick={handlePause} className="h-8 gap-1">
                  <Pause className="h-3.5 w-3.5" />
                  일시정지
                </Button>
              ) : (
                <Button size="sm" onClick={handleStart} className="h-8 gap-1">
                  <Play className="h-3.5 w-3.5" />
                  {elapsed > 0 ? '재개' : '시작'}
                </Button>
              )}
              {elapsed > 0 && (
                <Button size="sm" variant="outline" onClick={handleDone} className="h-8 gap-1 text-green-600 hover:text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  완료
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
