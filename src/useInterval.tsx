import { useEffect, useRef, useCallback } from 'react'

export const useInterval = (callback: () => void, interval: number) => {
  const intervalRef = useRef<number | null>(null)

  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      callback()
    }, interval);
  }, [callback, interval])

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [])

  return { startInterval, stopInterval }
}
