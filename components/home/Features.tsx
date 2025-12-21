'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Shield, Sparkles, Heart, Clock, Leaf, Users, Star } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'

const features = [
    {
        icon: Shield,
        title: 'Verified Excellence',
        description: 'Every villa is personally inspected and meets our rigorous standards for luxury.',
        stat: 100,
        statSuffix: '%',
        statLabel: 'Verified'
    },
    {
        icon: Sparkles,
        title: 'Curated Collection',
        description: 'Hand-picked properties offering unique experiences in the heart of Ubud.',
        stat: 50,
        statSuffix: '+',
        statLabel: 'Villas'
    },
    {
        icon: Heart,
        title: 'Personal Concierge',
        description: '24/7 dedicated support to craft your perfect Balinese experience.',
        stat: 24,
        statSuffix: '/7',
        statLabel: 'Support'
    },
    {
        icon: Clock,
        title: 'Seamless Booking',
        description: 'Instant confirmation with flexible cancellation policies.',
        stat: 1,
        statPrefix: '< ',
        statSuffix: 'hr',
        statLabel: 'Response'
    },
    {
        icon: Leaf,
        title: 'Eco-Conscious',
        description: 'Partnering with sustainable properties committed to preserving Bali.',
        stat: 80,
        statSuffix: '%',
        statLabel: 'Eco Certified'
    },
    {
        icon: Users,
        title: 'Local Expertise',
        description: 'Insider knowledge from Bali residents to enhance your stay.',
        stat: 10,
        statSuffix: '+',
        statLabel: 'Years'
    },
]

const stats = [
    { value: 5000, suffix: '+', label: 'Happy Guests' },
    { value: 4.9, suffix: '', label: 'Average Rating', decimals: 1 },
    { value: 50, suffix: '+', label: 'Luxury Villas' },
    { value: 10, suffix: '+', label: 'Years Experience' },
]

// Text reveal component
function TextReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <div className="overflow-hidden" ref={ref}>
            <motion.div
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    )
}

// Scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    )
}

export default function Features() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

    return (
        <section ref={containerRef} className="relative py-32 md:py-40 bg-white overflow-hidden">
            {/* Parallax Background Pattern */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-10 w-72 h-72 bg-olive-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive-100/40 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-olive-50/30 rounded-full blur-3xl" />
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="text-center mb-20 md:mb-24">
                        <ScrollReveal>
                            <p className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
                                <Star size={12} className="fill-olive-600" />
                                Why Choose Us
                                <Star size={12} className="fill-olive-600" />
                            </p>
                        </ScrollReveal>

                        <TextReveal delay={0.1}>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
                                The StayinUBUD <span className="italic text-olive-600">Difference</span>
                            </h2>
                        </TextReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                Experience unparalleled service and attention to detail that transforms your Bali stay into an unforgettable journey.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <ScrollReveal key={index} delay={0.1 * index}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative p-8 md:p-10 bg-white border border-gray-100 hover:border-olive-200 hover:shadow-xl transition-all duration-500"
                                >
                                    {/* Number */}
                                    <span className="absolute top-6 right-6 text-6xl font-display text-gray-100 group-hover:text-olive-100 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className="relative w-14 h-14 flex items-center justify-center bg-olive-100 text-olive-600 mb-6 group-hover:bg-olive-600 group-hover:text-white transition-all duration-300"
                                    >
                                        <feature.icon size={24} />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="font-display text-xl text-gray-900 mb-3 group-hover:text-olive-900 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                                        {feature.description}
                                    </p>

                                    {/* Stat with CountUp */}
                                    <div className="flex items-end gap-2 pt-4 border-t border-gray-100">
                                        <CountUp
                                            end={feature.stat}
                                            suffix={feature.statSuffix || ''}
                                            prefix={feature.statPrefix || ''}
                                            duration={2}
                                            className="font-display text-3xl text-olive-600 group-hover:text-olive-900 transition-colors"
                                        />
                                        <span className="text-gray-400 text-sm mb-1">{feature.statLabel}</span>
                                    </div>

                                    {/* Hover accent line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-olive-600"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Bottom Stats Bar with CountUp */}
                    <ScrollReveal delay={0.4}>
                        <div className="mt-20 md:mt-24 py-12 px-8 md:px-16 bg-olive-900 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <CountUp
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        decimals={stat.decimals || 0}
                                        duration={2.5}
                                        className="font-display text-4xl md:text-5xl text-white"
                                    />
                                    <p className="text-olive-300 text-sm tracking-wider uppercase mt-2">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </motion.div>
        </section>
    )
}
