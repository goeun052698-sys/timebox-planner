import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export default function SelectableTask({ task, isSelected, selectedIndex, onSelect }) {
  return (
    <Card
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-md",
        isSelected
          ? "bg-primary/5 border-primary/30 opacity-60"
          : "hover:border-primary/20"
      )}
      onClick={() => !isSelected && onSelect(task.id)}
    >
      <div className="flex items-center gap-2">
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Check className="h-3 w-3 text-primary" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
        )}
        <span className={cn("text-sm", isSelected && "line-through text-muted-foreground")}>
          {task.text}
        </span>
      </div>
    </Card>
  )
}
