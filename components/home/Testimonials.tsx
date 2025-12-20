'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        id: 1,
        quote: "An absolutely transcendent experience. The attention to detail was extraordinary, and our private villa exceeded every expectation. This is what true luxury feels like.",
        author: "Alexandra Chen",
        location: "Hong Kong",
        rating: 5,
        villa: "Villa Lotus Dream",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
    },
    {
        id: 2,
        quote: "We've stayed at luxury properties around the world, but StayinUBUD set a new standard. The concierge service was impeccable, and the villa was simply breathtaking.",
        author: "James & Victoria Miller",
        location: "London, UK",
        rating: 5,
        villa: "Villa Taman Surga",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
    },
    {
        id: 3,
        quote: "A hidden paradise. The privacy, the views, the service—everything was curated to perfection. We're already planning our return visit.",
        author: "Sophie Laurent",
        location: "Paris, France",
        rating: 5,
        villa: "Villa Bambu Retreat",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    return (
        <section ref={ref} className="py-24 md:py-32 bg-olive-100/30 relative overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute top-20 left-10 md:left-20 opacity-[0.03] pointer-events-none">
                <Quote size={300} className="text-olive-900" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4">
                            Guest Experiences
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900">
                            What Our <span className="italic">Guests</span> Say
                        </h2>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <button
                            onClick={prev}
                            className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-olive-900 hover:border-olive-900 hover:text-white transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-olive-900 hover:border-olive-900 hover:text-white transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                </div>

                {/* Testimonial */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="grid lg:grid-cols-12 gap-12 items-center"
                        >
                            {/* Image */}
                            <div className="lg:col-span-4 flex justify-center lg:justify-start">
                                <div className="relative">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
                                        <Image
                                            src={testimonials[current].image}
                                            alt={testimonials[current].author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-3 border border-olive-400/50 rounded-full" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="lg:col-span-8">
                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-olive-600 fill-olive-600" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-8 leading-relaxed">
                                    "{testimonials[current].quote}"
                                </blockquote>

                                {/* Author Info */}
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                                    <div>
                                        <p className="text-gray-900 font-medium">{testimonials[current].author}</p>
                                        <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                                    </div>
                                    <div className="hidden md:block w-px h-8 bg-gray-300" />
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider">Stayed at</p>
                                        <p className="text-olive-600 text-sm">{testimonials[current].villa}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3 mt-12"
                >
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-300 ${index === current
                                    ? 'w-12 h-1 bg-olive-600'
                                    : 'w-6 h-1 bg-gray-300 hover:bg-olive-400'
                                }`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
