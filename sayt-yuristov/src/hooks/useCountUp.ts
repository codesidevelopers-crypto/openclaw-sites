import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  target: number
  duration?: number
  suffix?: string
}

interface UseCountUpResult {
  value: string
  ref: React.RefObject<HTMLDivElement>
}

const useCountUp = ({ target, duration = 2000, suffix = '' }: UseCountUpOptions): UseCountUpResult => {
  const [value, setValue] = useState<string>('0')
  const ref = useRef<HTMLDivElement>(null)
  const hasStarted = useRef<boolean>(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const start = performance.now()

          const animate = (now: number): void => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * target)
            setValue(`${current}${suffix}`)
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, suffix])

  return { value, ref }
}

export default useCountUp
