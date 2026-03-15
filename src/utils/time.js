export function generateTimeOptions(startHour = 9, endHour = 18) {
  const options = []
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === endHour && m > 0) break
      options.push({
        value: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
      })
    }
  }
  return options
}

export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function timeToPixelOffset(timeStr, startHour = 9, pixelsPerHour = 80) {
  const minutes = timeToMinutes(timeStr)
  const startMinutes = startHour * 60
  return ((minutes - startMinutes) / 60) * pixelsPerHour
}

export function durationToPixelHeight(durationMinutes, pixelsPerHour = 80) {
  return (durationMinutes / 60) * pixelsPerHour
}

export function hasOverlap(blocks) {
  const sorted = [...blocks]
    .filter(b => b.startTime && b.endTime)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
  for (let i = 0; i < sorted.length - 1; i++) {
    if (timeToMinutes(sorted[i].endTime) > timeToMinutes(sorted[i + 1].startTime)) {
      return true
    }
  }
  return false
}

export const PRIORITY_COLORS = [
  'bg-rose-500',
  'bg-amber-500',
  'bg-blue-500',
]

export const PRIORITY_COLORS_LIGHT = [
  'bg-rose-100 dark:bg-rose-900/30',
  'bg-amber-100 dark:bg-amber-900/30',
  'bg-blue-100 dark:bg-blue-900/30',
]

export const PRIORITY_BORDER_COLORS = [
  'border-rose-500',
  'border-amber-500',
  'border-blue-500',
]
