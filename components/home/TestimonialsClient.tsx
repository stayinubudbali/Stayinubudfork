'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { Testimonial } from '@/types'

interface TestimonialsClientProps {
    testimonials: Testimonial[]
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
    const [current, setCurrent] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Drag handling
    const dragX = useMotionValue(0)

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
        if (info.offset.x > 50) prev()
        else if (info.offset.x < -50) next()
    }

    if (testimonials.length === 0) return null

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Decorative Quote */}
            <motion.div
                className="absolute top-20 left-10 md:left-20 opacity-[0.02] pointer-events-none"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Quote size={400} strokeWidth={1} />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4"
                    >
                        Guest Experiences
                    </motion.p>

                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80 }}
                            animate={isInView ? { y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900"
                        >
                            What Our <span className="italic text-olive-600">Guests</span> Say
                        </motion.h2>
                    </div>
                </div>

                {/* Testimonial Slider */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.1}
                            onDragEnd={handleDragEnd}
                            style={{ x: dragX }}
                            className="text-center cursor-grab active:cursor-grabbing"
                        >
                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-8">
                                {[...Array(testimonials[current].rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Star size={18} className="text-olive-400 fill-olive-400" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display text-gray-900 leading-relaxed mb-10 max-w-3xl mx-auto">
                                "{testimonials[current].quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    {testimonials[current].guest_image ? (
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={testimonials[current].guest_image}
                                                alt={testimonials[current].guest_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center text-olive-600 text-xl font-medium">
                                            {testimonials[current].guest_name.charAt(0)}
                                        </div>
                                    )}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-olive-400"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </div>
                                <p className="font-medium text-gray-900 text-lg">
                                    {testimonials[current].guest_name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {testimonials[current].guest_location}
                                    {testimonials[current].villa_name && ` • ${testimonials[current].villa_name}`}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    {testimonials.length > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prev}
                                className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-olive-600 hover:border-olive-600 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>

                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === current ? 'bg-olive-600 w-6' : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={next}
                                className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-olive-600 hover:border-olive-600 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>
                    )}

                    {/* Mobile swipe hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                        className="md:hidden text-center text-gray-400 text-xs mt-6"
                    >
                        ← Swipe to navigate →
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
