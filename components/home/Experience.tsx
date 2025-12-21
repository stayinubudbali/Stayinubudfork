'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const experiences = [
    {
        title: 'Sunrise Yoga',
        description: 'Start your day with rejuvenating yoga sessions overlooking rice terraces',
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
        category: 'Wellness'
    },
    {
        title: 'Balinese Spa',
        description: 'Traditional healing treatments using ancient techniques and local herbs',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
        category: 'Relaxation'
    },
    {
        title: 'Rice Field Trek',
        description: 'Guided walks through emerald terraces and hidden waterfalls',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800',
        category: 'Adventure'
    },
    {
        title: 'Cooking Class',
        description: 'Master authentic Balinese recipes with local culinary experts',
        image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800',
        category: 'Culture'
    },
    {
        title: 'Temple Ceremony',
        description: 'Experience sacred rituals and ancient spiritual traditions',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
        category: 'Spiritual'
    },
    {
        title: 'Art Workshop',
        description: 'Learn traditional Balinese painting and craft techniques',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
        category: 'Creative'
    },
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

export default function Experience() {
    const containerRef = useRef<HTMLElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

    return (
        <section ref={containerRef} className="relative py-32 md:py-40 bg-olive-900 overflow-hidden">
            {/* Parallax Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-olive-800/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Decorative circles */}
                <div className="absolute top-20 left-20 w-64 h-64 border border-olive-700/30 rounded-full" />
                <div className="absolute bottom-40 right-40 w-96 h-96 border border-olive-700/20 rounded-full" />
            </motion.div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20">
                    <div className="max-w-2xl">
                        <ScrollReveal>
                            <p className="text-olive-400 text-xs tracking-[0.3em] uppercase mb-4">
                                Beyond Accommodation
                            </p>
                        </ScrollReveal>

                        <TextReveal delay={0.1}>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                                Curated <span className="italic text-olive-400">Experiences</span>
                            </h2>
                        </TextReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Immerse yourself in the magic of Ubud with our carefully crafted experiences,
                                designed to connect you with the soul of Bali.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={0.3}>
                        <Link
                            href="/experiences"
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-olive-900 transition-all"
                        >
                            <span>View All</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Experience Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((experience, index) => (
                        <ScrollReveal key={index} delay={0.1 * index}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="group relative cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={experience.image}
                                            alt={experience.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-olive-900 text-xs tracking-wider uppercase"
                                    >
                                        {experience.category}
                                    </motion.div>

                                    {/* Explore Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-4 right-4"
                                    >
                                        <div className="w-12 h-12 bg-olive-600 text-white flex items-center justify-center group-hover:bg-olive-400 transition-colors">
                                            <ArrowRight size={18} />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-display text-2xl text-white mb-2 group-hover:text-olive-400 transition-colors">
                                        {experience.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        {experience.description}
                                    </p>
                                </div>

                                {/* Hover line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-olive-400"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '50%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom Quote */}
                <ScrollReveal delay={0.5}>
                    <div className="mt-24 text-center">
                        <motion.blockquote
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto"
                        >
                            <p className="font-display text-2xl md:text-3xl text-white/80 italic leading-relaxed mb-6">
                                "A journey of a thousand miles begins with a single step into the heart of Bali."
                            </p>
                            <cite className="text-olive-400 text-sm tracking-wider uppercase not-italic">
                                — The StayinUBUD Philosophy
                            </cite>
                        </motion.blockquote>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
