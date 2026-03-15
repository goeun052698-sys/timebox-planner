import { cn } from '@/lib/utils'
import { timeToPixelOffset, durationToPixelHeight, timeToMinutes, PRIORITY_COLORS } from '@/utils/time'

const PIXELS_PER_HOUR = 80
const START_HOUR = 9
const END_HOUR = 18
const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * PIXELS_PER_HOUR

export default function Timeline({ timeblocks, tasks, priorities }) {
  const hours = []
  for (let h = START_HOUR; h <= END_HOUR; h++) {
    hours.push(h)
  }

  const blocks = timeblocks
    .map((block, i) => {
      if (!block.startTime || !block.endTime) return null
      const task = tasks.find(t => t.id === block.taskId)
      if (!task) return null
      const top = timeToPixelOffset(block.startTime, START_HOUR, PIXELS_PER_HOUR)
      const duration = timeToMinutes(block.endTime) - timeToMinutes(block.startTime)
      const height = durationToPixelHeight(duration, PIXELS_PER_HOUR)
      return { ...block, task, top, height, index: i }
    })
    .filter(Boolean)

  return (
    <div className="relative border rounded-lg bg-card p-4" style={{ height: TOTAL_HEIGHT + 40 }}>
      {hours.map(h => {
        const top = (h - START_HOUR) * PIXELS_PER_HOUR
        return (
          <div key={h} className="absolute left-0 right-0" style={{ top: top + 20 }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-10 text-right shrink-0">
                {String(h).padStart(2, '0')}:00
              </span>
              <div className="flex-1 border-t border-dashed border-muted" />
            </div>
          </div>
        )
      })}
      {blocks.map(block => (
        <div
          key={block.taskId}
          className={cn(
            "absolute left-14 right-4 rounded-md px-3 py-1.5 text-white text-xs font-medium flex items-start overflow-hidden",
            PRIORITY_COLORS[block.index]
          )}
          style={{ top: block.top + 20, height: Math.max(block.height, 24) }}
        >
          <span className="truncate">{block.task.text}</span>
        </div>
      ))}
    </div>
  )
}
