import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { timeToMinutes, PRIORITY_COLORS } from '@/utils/time'
import { PartyPopper, RotateCcw } from 'lucide-react'

export default function DaySummary({ open, onClose, timeblocks, tasks, onReset }) {
  const totalMinutes = timeblocks.reduce((sum, b) => {
    if (!b.startTime || !b.endTime) return sum
    return sum + (timeToMinutes(b.endTime) - timeToMinutes(b.startTime))
  }, 0)

  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2">
            <PartyPopper className="h-10 w-10 text-amber-500" />
          </div>
          <DialogTitle className="text-xl">오늘의 계획 완성!</DialogTitle>
          <DialogDescription>
            총 집중 시간: <strong className="text-foreground">{hours}시간 {mins}분</strong>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-3 py-2">
          {timeblocks.map((block, i) => {
            const task = tasks.find(t => t.id === block.taskId)
            if (!task) return null
            const dur = block.startTime && block.endTime
              ? timeToMinutes(block.endTime) - timeToMinutes(block.startTime)
              : 0
            return (
              <div key={block.taskId} className="flex items-center gap-3">
                <Badge className={cn(PRIORITY_COLORS[i], "text-white border-0 shrink-0")}>
                  {i + 1}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {block.startTime} - {block.endTime} ({dur}분)
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            다시 계획하기
          </Button>
          <Button onClick={onClose}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
