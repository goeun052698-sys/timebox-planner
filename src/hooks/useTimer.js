import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(onTick) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)
  const accumulatedRef = useRef(0)

  const start = useCallback(() => {
    if (running) return
    startTimeRef.current = Date.now()
    setRunning(true)
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const total = accumulatedRef.current + (now - startTimeRef.current)
      setElapsed(total)
    }, 100)
  }, [running])

  const pause = useCallback(() => {
    if (!running) return
    clearInterval(intervalRef.current)
    accumulatedRef.current += Date.now() - startTimeRef.current
    setElapsed(accumulatedRef.current)
    setRunning(false)
  }, [running])

  const reset = useCallback(() => {
    clearInterval(intervalRef.current)
    accumulatedRef.current = 0
    startTimeRef.current = null
    setElapsed(0)
    setRunning(false)
  }, [])

  const restore = useCallback((ms, isRunning) => {
    accumulatedRef.current = ms
    setElapsed(ms)
    if (isRunning) {
      startTimeRef.current = Date.now()
      setRunning(true)
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const total = accumulatedRef.current + (now - startTimeRef.current)
        setElapsed(total)
      }, 100)
    }
  }, [])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return { elapsed, running, start, pause, reset, restore }
}

export function formatElapsed(ms) {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
