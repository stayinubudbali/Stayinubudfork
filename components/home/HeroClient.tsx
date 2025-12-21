'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Calendar, Users, Search, ArrowRight, Pause, Play, ChevronDown } from 'lucide-react'

interface FeaturedVilla {
    id: string
    name: string
    tagline: string
    description: string
    image: string
    bedrooms: number
    guests: number
    price: number
}

interface HeroClientProps {
    villas: FeaturedVilla[]
}

export default function HeroClient({ villas }: HeroClientProps) {
    const [current, setCurrent] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(false)
    const heroRef = useRef<HTMLElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const minDate = new Date().toISOString().split('T')[0]

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.5])
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // Track mouse for parallax effect (desktop only)
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isMobile || !heroRef.current) return
        const { clientX, clientY } = e
        const { width, height } = heroRef.current.getBoundingClientRect()
        setMousePosition({
            x: (clientX / width - 0.5) * 30,
            y: (clientY / height - 0.5) * 30,
        })
    }, [isMobile])

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove)
            return () => window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove, isMobile])

    // Auto-slide
    useEffect(() => {
        if (isPlaying && villas.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % villas.length)
            }, 6000)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying, villas.length])

    const next = () => setCurrent((prev) => (prev + 1) % villas.length)
    const prev = () => setCurrent((prev) => (prev - 1 + villas.length) % villas.length)
    const goTo = (index: number) => setCurrent(index)

    const currentVilla = villas[current]

    if (!currentVilla) return null

    return (
        <section ref={heroRef} className="relative h-[100svh] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-gray-900">
            {/* Background with Parallax */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        style={isMobile ? {} : { y: heroY, scale: heroScale }}
                        className="absolute inset-[-50px] md:inset-[-100px]"
                    >
                        <motion.div
                            animate={isMobile ? {} : { x: mousePosition.x, y: mousePosition.y }}
                            transition={{ type: 'spring', damping: 50, stiffness: 100 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentVilla.image}
                                alt={currentVilla.name}
                                fill
                                priority
                                className="object-cover"
                                sizes="100vw"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/60 to-gray-900/30 md:from-gray-900/90 md:via-gray-900/50 md:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-gray-900/50 md:from-gray-900/80 md:via-transparent md:to-gray-900/40" />
                </motion.div>
            </AnimatePresence>

            {/* Dark overlay on scroll */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black pointer-events-none z-10"
            />

            {/* Content */}
            <motion.div
                style={isMobile ? {} : { y: contentY, opacity: contentOpacity }}
                className="relative z-20 h-full flex flex-col"
            >
                {/* Main Content Area */}
                <div className="flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-20 md:pt-24">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="max-w-full md:max-w-2xl">
                            {/* Animated Badge */}
                            <motion.div
                                key={`badge-${current}`}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6"
                            >
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-olive-400 rounded-full animate-pulse" />
                                <span className="text-white/80 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                                    {currentVilla.tagline}
                                </span>
                            </motion.div>

                            {/* Title with staggered reveal */}
                            <div className="overflow-hidden mb-2 sm:mb-4">
                                <motion.h1
                                    key={`name-${current}`}
                                    initial={{ y: 120 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white leading-[1] sm:leading-[0.95]"
                                >
                                    {currentVilla.name.split(' ').slice(0, -1).join(' ')}
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
                                <motion.h1
                                    key={`name2-${current}`}
                                    initial={{ y: 120 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl italic text-olive-400 leading-[1] sm:leading-[0.95]"
                                >
                                    {currentVilla.name.split(' ').slice(-1)}
                                </motion.h1>
                            </div>

                            {/* Description with fade in */}
                            <motion.p
                                key={`desc-${current}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-full sm:max-w-md md:max-w-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 line-clamp-3 sm:line-clamp-none"
                            >
                                {currentVilla.description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                            >
                                <Link
                                    href={`/villas/${currentVilla.id}`}
                                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-olive-600 text-white font-medium text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase overflow-hidden"
                                >
                                    <span className="relative z-10">Explore Villa</span>
                                    <motion.span
                                        className="relative z-10"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                                    </motion.span>
                                    <motion.div
                                        className="absolute inset-0 bg-olive-400"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </Link>
                                <Link
                                    href="/villas"
                                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
                                >
                                    <span>View All Villas</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="px-4 sm:px-6 md:px-12 lg:px-20 pb-4 sm:pb-6 md:pb-8 lg:pb-12">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                            {/* Controls - Hidden on very small screens */}
                            <div className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-10 h-10 md:w-12 md:h-12 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                                >
                                    {isPlaying ? <Pause size={14} className="md:w-4 md:h-4" /> : <Play size={14} className="md:w-4 md:h-4" />}
                                </motion.button>

                                <div className="flex items-center gap-1 sm:gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={prev}
                                        className="w-10 h-10 md:w-12 md:h-12 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                                    >
                                        <ChevronLeft size={16} className="md:w-5 md:h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={next}
                                        className="w-10 h-10 md:w-12 md:h-12 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                                    >
                                        <ChevronRight size={16} className="md:w-5 md:h-5" />
                                    </motion.button>
                                </div>

                                {/* Progress Bars */}
                                <div className="flex items-center gap-2 md:gap-3">
                                    {villas.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => goTo(index)}
                                            className="relative h-1 overflow-hidden"
                                            initial={false}
                                            animate={{ width: index === current ? 48 : 24 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="absolute inset-0 bg-white/20" />
                                            {index === current && (
                                                <motion.div
                                                    className="absolute inset-0 bg-olive-400"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 6, ease: 'linear' }}
                                                    style={{ transformOrigin: 'left' }}
                                                    key={`progress-${current}`}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="hidden md:flex items-center gap-2 text-white/40 text-sm font-mono ml-2 lg:ml-4">
                                    <span className="text-xl lg:text-2xl text-white font-display">{String(current + 1).padStart(2, '0')}</span>
                                    <span className="text-white/30">/</span>
                                    <span>{String(villas.length).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Mobile Controls */}
                            <div className="flex sm:hidden items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prev}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    {villas.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goTo(index)}
                                            className={`h-1 transition-all ${index === current ? 'w-6 bg-olive-400' : 'w-3 bg-white/30'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Search Widget */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-2xl w-full lg:max-w-xl"
                            >
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <Calendar size={14} className="sm:w-4 sm:h-4 text-olive-600" />
                                    <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gray-500 font-medium">Check Availability</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check In</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value)
                                                if (checkOut && e.target.value >= checkOut) setCheckOut('')
                                            }}
                                            min={minDate}
                                            className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-200 text-xs sm:text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 hover:border-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check Out</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            min={checkIn || minDate}
                                            className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-200 text-xs sm:text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 hover:border-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mb-1">Guests</label>
                                        <div className="relative">
                                            <Users size={12} className="sm:w-3.5 sm:h-3.5 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 sm:py-3 border border-gray-200 text-xs sm:text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 appearance-none hover:border-gray-300"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-end col-span-2 md:col-span-1">
                                        <Link
                                            href={`/villas?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-olive-600 text-white text-xs sm:text-sm font-medium hover:bg-olive-900 transition-colors tracking-wider uppercase"
                                        >
                                            <Search size={14} className="sm:w-4 sm:h-4" />
                                            <span>Search</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator - Desktop only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 hidden lg:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                    <ChevronDown size={16} />
                </motion.div>
            </motion.div>

            {/* Thumbnails - Desktop only */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-36 lg:bottom-40 right-8 lg:right-20 z-30 hidden xl:flex items-center gap-3"
            >
                {villas.map((villa, index) => (
                    <motion.button
                        key={villa.id}
                        onClick={() => goTo(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative overflow-hidden transition-all duration-300 ${index === current
                            ? 'w-20 h-20 lg:w-24 lg:h-24 ring-2 ring-olive-400 ring-offset-2 ring-offset-gray-900'
                            : 'w-16 h-16 lg:w-20 lg:h-20 opacity-60 hover:opacity-100'
                            }`}
                    >
                        <Image src={villa.image} alt={villa.name} fill className="object-cover" sizes="96px" />
                        {index === current && (
                            <motion.div
                                layoutId="activeThumb"
                                className="absolute inset-0 border-2 border-olive-400"
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>
        </section>
    )
}
