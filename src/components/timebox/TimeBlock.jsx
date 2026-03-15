import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TimeSlider from './TimeSlider'
import { cn } from '@/lib/utils'
import { PRIORITY_COLORS, PRIORITY_COLORS_LIGHT, PRIORITY_BORDER_COLORS } from '@/utils/time'
import { timeToMinutes } from '@/utils/time'

export default function TimeBlock({ index, task, block, onUpdate }) {
  const duration = block.startTime && block.endTime
    ? timeToMinutes(block.endTime) - timeToMinutes(block.startTime)
    : 0

  return (
    <Card className={cn(
      "p-4 border-2 transition-all",
      PRIORITY_COLORS_LIGHT[index],
      PRIORITY_BORDER_COLORS[index]
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Badge className={cn("shrink-0", PRIORITY_COLORS[index], "text-white border-0")}>
            {index + 1}
          </Badge>
          <span className="text-sm font-medium truncate">{task.text}</span>
        </div>
        {duration > 0 && (
          <span className="text-xs text-muted-foreground shrink-0">{duration}분</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <TimeSlider
          label="시작"
          value={block.startTime}
          onChange={v => onUpdate(index, { ...block, startTime: v })}
          maxTime={block.endTime}
        />
        <TimeSlider
          label="종료"
          value={block.endTime}
          onChange={v => onUpdate(index, { ...block, endTime: v })}
          minTime={block.startTime}
        />
      </div>
    </Card>
  )
}
