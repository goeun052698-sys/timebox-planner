let counter = 0

export function generateId() {
  return `task_${Date.now()}_${counter++}`
}
