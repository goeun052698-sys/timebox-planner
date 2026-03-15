import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRIORITY_COLORS, PRIORITY_COLORS_LIGHT, PRIORITY_BORDER_COLORS } from '@/utils/time'

export default function SelectedSlots({ priorities, tasks, onRemove }) {
  const slots = [0, 1, 2]

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Top 3 우선순위</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {slots.map(i => {
          const priority = priorities[i]
          const task = priority ? tasks.find(t => t.id === priority.taskId) : null
          return (
            <Card
              key={i}
              className={cn(
                "p-3 flex items-center gap-2 transition-all min-h-[56px]",
                task
                  ? `${PRIORITY_COLORS_LIGHT[i]} border-2 ${PRIORITY_BORDER_COLORS[i]}`
                  : "border-dashed border-2"
              )}
            >
              <Badge className={cn(
                "shrink-0",
                task ? `${PRIORITY_COLORS[i]} text-white border-0` : "bg-muted text-muted-foreground"
              )}>
                {i + 1}
              </Badge>
              {task ? (
                <>
                  <span className="flex-1 text-sm font-medium truncate">{task.text}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 shrink-0"
                    onClick={() => onRemove(i)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">탭하여 선택</span>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
