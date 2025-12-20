'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Users, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Hero() {
    const router = useRouter()
    const [scrollY, setScrollY] = useState(0)
    const { scrollYProgress } = useScroll()

    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 500])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push('/villas')
    }

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                style={{ y: parallaxY, opacity }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-cream" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Experience Luxury in the
                            <br />
                            <span className="text-sage-light font-knewave">Heart of Ubud</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/90 mb-12"
                    >
                        Discover your perfect villa retreat with stunning rice field views,
                        private pools, and authentic Balinese hospitality.
                    </motion.p>

                    {/* Search Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="glass rounded-2xl p-6 md:p-8 max-w-3xl mx-auto"
                    >
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    <Calendar size={16} className="inline mr-1" />
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    <Calendar size={16} className="inline mr-1" />
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    <Users size={16} className="inline mr-1" />
                                    Guests
                                </label>
                                <select className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
                                    <option>1-2</option>
                                    <option>3-4</option>
                                    <option>5-6</option>
                                    <option>7-8</option>
                                </select>
                            </div>

                            <div className="md:col-span-1 flex items-end">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-sage text-white py-3 px-6 rounded-lg font-semibold hover:bg-sage-dark transition-all smooth-transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 animate-float"
                                >
                                    <Search size={20} />
                                    <span>Search</span>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-16"
                    >
                        <div className="animate-bounce">
                            <svg
                                className="w-6 h-6 text-white/70 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
