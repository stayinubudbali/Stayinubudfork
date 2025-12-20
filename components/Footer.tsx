'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Phone, Mail, Instagram, Leaf } from 'lucide-react'

export default function Footer() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const links = {
        explore: [
            { label: 'All Villas', href: '/villas' },
            { label: 'About Us', href: '/about' },
            { label: 'Journal', href: '/blog' },
            { label: 'Contact', href: '/contact' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Booking Policy', href: '/booking-policy' },
        ],
    }

    return (
        <footer ref={ref} className="bg-gray-900 text-white relative overflow-hidden">
            {/* Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-400/50 to-transparent" />

            {/* Newsletter Section */}
            <div className="border-b border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="max-w-xl"
                        >
                            <p className="text-olive-400 text-xs tracking-[0.3em] uppercase mb-4">Stay Updated</p>
                            <h3 className="font-display text-3xl md:text-4xl mb-4">
                                Get Exclusive <span className="italic">Offers</span>
                            </h3>
                            <p className="text-white/50">
                                Subscribe to receive curated villa recommendations and special member-only rates.
                            </p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 lg:w-80 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-olive-400/50 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-olive-400 transition-colors"
                            >
                                Subscribe
                            </button>
                        </motion.form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-display text-3xl md:text-4xl">
                                Stayin<span className="text-olive-400">UBUD</span>
                            </span>
                        </Link>
                        <p className="text-white/40 max-w-sm leading-relaxed mb-8 text-sm">
                            Curating exceptional villa experiences in Ubud, Bali.
                            Where architectural excellence meets Balinese tranquility.
                        </p>

                        {/* Eco Badge */}
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 inline-flex">
                            <Leaf size={16} className="text-olive-400" />
                            <span className="text-white/60 text-xs">Eco-Friendly Luxury</span>
                        </div>
                    </motion.div>

                    {/* Explore Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">
                            Explore
                        </p>
                        <ul className="space-y-4">
                            {links.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-olive-400 transition-colors text-sm inline-flex items-center gap-1 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">
                            Legal
                        </p>
                        <ul className="space-y-4">
                            {links.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-olive-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">
                            Contact Us
                        </p>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:hello@stayinubud.com"
                                    className="flex items-center gap-3 text-white/60 hover:text-olive-400 transition-colors text-sm"
                                >
                                    <Mail size={16} className="text-olive-400/50" />
                                    hello@stayinubud.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+6281234567890"
                                    className="flex items-center gap-3 text-white/60 hover:text-olive-400 transition-colors text-sm"
                                >
                                    <Phone size={16} className="text-olive-400/50" />
                                    +62 812 3456 7890
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <MapPin size={16} className="text-olive-400/50 flex-shrink-0 mt-0.5" />
                                <span>Jl. Raya Ubud No. 88<br />Ubud, Bali 80571</span>
                            </li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-8">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-olive-400 hover:border-olive-400/50 transition-all"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-white/30 text-xs">
                            © {new Date().getFullYear()} StayinUBUD. All rights reserved.
                        </p>
                        <p className="text-white/20 text-xs">
                            Crafted with passion in Ubud, Bali
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
