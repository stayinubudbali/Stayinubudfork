'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Star } from 'lucide-react'

export default function CTASection() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    return (
        <section ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-gray-900">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-gray-900/80" />
            </motion.div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-400/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-400/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-olive-400 fill-olive-400" />
                                ))}
                            </div>
                            <span className="text-white/50 text-sm">Rated 4.9/5 by our guests</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                        >
                            Begin Your <br />
                            <span className="italic text-olive-400">Extraordinary</span> Stay
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/50 text-lg max-w-md mb-10 leading-relaxed"
                        >
                            Let us curate your perfect Bali escape. Our concierge team is
                            ready to craft an unforgettable experience tailored just for you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/villas"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-olive-400 transition-colors"
                            >
                                <span>Browse Villas</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-gray-900 transition-all"
                            >
                                <Phone size={16} />
                                <span>Contact Concierge</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Content - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <p className="font-display text-5xl text-olive-400 mb-2">24/7</p>
                                <p className="text-white/40 text-sm tracking-wide">Concierge Service</p>
                            </div>
                            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <p className="font-display text-5xl text-olive-400 mb-2">Free</p>
                                <p className="text-white/40 text-sm tracking-wide">Airport Transfer</p>
                            </div>
                            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <p className="font-display text-5xl text-olive-400 mb-2">VIP</p>
                                <p className="text-white/40 text-sm tracking-wide">Welcome Package</p>
                            </div>
                            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <p className="font-display text-5xl text-olive-400 mb-2">100%</p>
                                <p className="text-white/40 text-sm tracking-wide">Privacy Guaranteed</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
