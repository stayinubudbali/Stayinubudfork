'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Phone, Mail, MapPin } from 'lucide-react'

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

export default function CTASection() {
    const containerRef = useRef<HTMLElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.7, 0.5])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
            {/* Parallax Background Image */}
            <motion.div
                ref={imageRef}
                style={{ y: backgroundY, scale: backgroundScale }}
                className="absolute inset-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
                    alt="Bali Villa View"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Dynamic Overlay */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 w-full py-32 md:py-40"
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Content */}
                        <div>
                            <ScrollReveal>
                                <div className="flex items-center gap-2 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <Star size={16} className="text-olive-400 fill-olive-400" />
                                        </motion.div>
                                    ))}
                                    <span className="text-white/60 text-sm ml-2">Rated 4.9 by our guests</span>
                                </div>
                            </ScrollReveal>

                            <TextReveal delay={0.1}>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6">
                                    Begin Your
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.2}>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-olive-400 italic leading-[1.1] mb-8">
                                    Bali Journey
                                </h2>
                            </TextReveal>

                            <ScrollReveal delay={0.3}>
                                <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                                    Let our concierge team craft your perfect getaway. From private chef experiences to sacred temple visits, we handle every detail.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4}>
                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link
                                        href="/villas"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-olive-600 text-white text-sm tracking-[0.15em] uppercase hover:bg-olive-400 transition-colors"
                                    >
                                        <span>Explore Villas</span>
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight size={16} />
                                        </motion.span>
                                    </Link>
                                    <a
                                        href="mailto:hello@stayinubud.com"
                                        className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
                                    >
                                        <Mail size={16} />
                                        <span>Contact Us</span>
                                    </a>
                                </div>
                            </ScrollReveal>

                            {/* Contact Info */}
                            <ScrollReveal delay={0.5}>
                                <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                                    <a href="tel:+6281234567890" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                                        <Phone size={16} className="text-olive-400" />
                                        <span className="text-sm">+62 812 3456 7890</span>
                                    </a>
                                    <div className="flex items-center gap-3 text-white/60">
                                        <MapPin size={16} className="text-olive-400" />
                                        <span className="text-sm">Ubud, Bali, Indonesia</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right - Stats Card */}
                        <ScrollReveal delay={0.4}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12"
                            >
                                <h3 className="font-display text-2xl text-white mb-8">
                                    Why Choose <span className="text-olive-400">StayinUBUD</span>
                                </h3>

                                <div className="space-y-6">
                                    {[
                                        { value: '50+', label: 'Curated Luxury Villas', desc: 'Hand-picked for excellence' },
                                        { value: '5,000+', label: 'Happy Guests', desc: 'From around the world' },
                                        { value: '24/7', label: 'Concierge Service', desc: 'Always here for you' },
                                        { value: '100%', label: 'Satisfaction Rate', desc: 'Guaranteed experiences' },
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            viewport={{ once: true }}
                                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0"
                                        >
                                            <motion.span
                                                className="font-display text-3xl md:text-4xl text-olive-400"
                                                initial={{ scale: 0.5 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: 0.2 + 0.1 * index, type: "spring" }}
                                                viewport={{ once: true }}
                                            >
                                                {stat.value}
                                            </motion.span>
                                            <div>
                                                <p className="text-white font-medium">{stat.label}</p>
                                                <p className="text-white/50 text-sm">{stat.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator on sides */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                />
            </div>
        </section>
    )
}
