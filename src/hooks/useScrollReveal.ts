import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    const targets = document.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [sectionRef])

  return sectionRef
}
