import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="할 일을 입력하세요..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        className="flex-1"
      />
      <Button onClick={handleSubmit} size="icon" disabled={!text.trim()}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
