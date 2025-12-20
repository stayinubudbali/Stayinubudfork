'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownRight, Leaf } from 'lucide-react'

export default function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    return (
        <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden bg-gray-900">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: backgroundY, scale }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/30 to-gray-900/80" />
            </motion.div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-28 left-6 md:left-12 z-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive-900/20 backdrop-blur-sm border border-olive-400/30">
                    <Leaf size={12} className="text-olive-400" />
                    <span className="text-olive-100 text-[10px] tracking-[0.15em] uppercase">
                        Eco Luxury Villas
                    </span>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28"
            >
                <div className="max-w-[1400px] mx-auto w-full">
                    {/* Overline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-olive-400 text-xs tracking-[0.25em] uppercase mb-6"
                    >
                        Curated Luxury Villas in Ubud, Bali
                    </motion.p>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-white leading-none">
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                Redefining
                            </span>
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-olive-400 italic mt-2">
                                Spaces
                            </span>
                        </h1>
                    </motion.div>

                    {/* Bottom Row */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-white/60 text-base md:text-lg max-w-md leading-relaxed"
                        >
                            Experience architectural excellence and serene luxury
                            in the heart of Bali's cultural paradise.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <Link href="/villas" className="group inline-flex items-center gap-4">
                                <span className="text-white text-xs tracking-[0.2em] uppercase">
                                    Explore Collection
                                </span>
                                <div className="w-12 h-12 md:w-14 md:h-14 border border-white/30 flex items-center justify-center group-hover:bg-olive-600 group-hover:border-olive-600 transition-all duration-300">
                                    <ArrowDownRight size={18} className="text-white transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="hidden md:flex items-center gap-12 lg:gap-16 mt-12 pt-8 border-t border-white/10"
                    >
                        <div>
                            <p className="font-display text-3xl lg:text-4xl text-white">25+</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase mt-1">Exclusive Villas</p>
                        </div>
                        <div>
                            <p className="font-display text-3xl lg:text-4xl text-white">4.9</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase mt-1">Guest Rating</p>
                        </div>
                        <div>
                            <p className="font-display text-3xl lg:text-4xl text-white">8</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase mt-1">Years Excellence</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-10 bg-gradient-to-b from-olive-400 to-transparent"
                />
            </motion.div>

            {/* Side Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
            >
                <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase rotate-90 origin-center whitespace-nowrap">
                    Est. 2016 — Ubud, Bali
                </p>
            </motion.div>
        </section>
    )
}
