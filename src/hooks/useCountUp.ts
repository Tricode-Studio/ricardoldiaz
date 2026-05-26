import { useEffect, useRef, useState } from 'react'

interface CountUpOptions {
  target: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export function useCountUp({
  target,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
}: CountUpOptions) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((ease * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [started, target, duration, decimals])

  const display = `${prefix}${value.toFixed(decimals)}${suffix}`
  return { ref, display }
}
