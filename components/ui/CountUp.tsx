'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    decimals?: number
    className?: string
}

export function CountUp({
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    decimals = 0,
    className = ''
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true

            const startTime = Date.now()
            const endTime = startTime + duration * 1000

            const animate = () => {
                const now = Date.now()
                const progress = Math.min((now - startTime) / (duration * 1000), 1)

                // Easing function (ease-out cubic)
                const easeOutCubic = 1 - Math.pow(1 - progress, 3)

                const currentCount = easeOutCubic * end
                setCount(currentCount)

                if (progress < 1) {
                    requestAnimationFrame(animate)
                } else {
                    setCount(end)
                }
            }

            requestAnimationFrame(animate)
        }
    }, [isInView, end, duration])

    const displayValue = decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toLocaleString()

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    )
}

// Parse string like "5,000+" into { value: 5000, suffix: "+" }
export function parseStatValue(str: string): { value: number, suffix: string, prefix: string } {
    // Remove commas and extract numeric part
    const cleanStr = str.replace(/,/g, '')
    const match = cleanStr.match(/^([^\d]*)(\d+\.?\d*)(.*)$/)

    if (match) {
        return {
            prefix: match[1] || '',
            value: parseFloat(match[2]) || 0,
            suffix: match[3] || ''
        }
    }

    return { value: 0, suffix: '', prefix: '' }
}
