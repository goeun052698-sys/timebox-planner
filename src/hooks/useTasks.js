import { useCallback } from 'react'
import { generateId } from '@/utils/id'

export function useTasks(tasks, setTasks) {
  const addTask = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, { id: generateId(), text: trimmed, createdAt: Date.now() }])
  }, [setTasks])

  const removeTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [setTasks])

  const updateTask = useCallback((id, newText) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))
  }, [setTasks])

  return { addTask, removeTask, updateTask }
}
