import { useCallback, useEffect, useRef } from 'react'

interface UseOptimizationOptions {
  debounceMs?: number
  throttleMs?: number
  maxRows?: number
}

export function useOptimization({
  debounceMs = 300,
  throttleMs = 100,
  maxRows = 100
}: UseOptimizationOptions = {}) {
  const debounceTimerRef = useRef<NodeJS.Timeout>()
  const throttleTimerRef = useRef<NodeJS.Timeout>()
  const lastRunRef = useRef<number>(0)

  // Debounce function
  const debounce = useCallback(
    (callback: Function) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      debounceTimerRef.current = setTimeout(() => {
        callback()
      }, debounceMs)
    },
    [debounceMs]
  )

  // Throttle function
  const throttle = useCallback(
    (callback: Function) => {
      const now = Date.now()
      if (now - lastRunRef.current >= throttleMs) {
        callback()
        lastRunRef.current = now
      } else if (!throttleTimerRef.current) {
        throttleTimerRef.current = setTimeout(() => {
          callback()
          lastRunRef.current = Date.now()
          throttleTimerRef.current = undefined
        }, throttleMs)
      }
    },
    [throttleMs]
  )

  // Virtual list handler
  const getVirtualizedItems = useCallback(
    (items: any[], startIndex: number, visibleCount: number) => {
      return items.slice(startIndex, startIndex + visibleCount)
    },
    []
  )

  // Row limit handler
  const handleRowLimit = useCallback(
    (rows: any[]) => {
      if (rows.length > maxRows) {
        console.warn(`Row count (${rows.length}) exceeds maximum (${maxRows})`)
        return rows.slice(0, maxRows)
      }
      return rows
    },
    [maxRows]
  )

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
      }
    }
  }, [])

  return {
    debounce,
    throttle,
    getVirtualizedItems,
    handleRowLimit
  }
}
