import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Check, X } from 'lucide-react'

export default function TaskItem({ task, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, editText.trim())
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <Card className="p-3 flex items-center gap-2">
        <Input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="flex-1"
          autoFocus
        />
        <Button size="icon" variant="ghost" onClick={handleSave}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setEditing(false)}>
          <X className="h-4 w-4" />
        </Button>
      </Card>
    )
  }

  return (
    <Card className="p-3 flex items-center gap-2 group hover:shadow-md transition-shadow">
      <span className="flex-1 text-sm text-left">{task.text}</span>
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        onClick={() => setEditing(true)}
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive"
        onClick={() => onRemove(task.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </Card>
  )
}
