'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrollY(currentScrollY)
            setIsScrolled(currentScrollY > 50)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const leftMenuItems = [
        { href: '/villas', label: 'Villas' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Journal' },
    ]

    const rightMenuItems = [
        { href: '/contact', label: 'Contact' },
    ]

    const allMenuItems = [...leftMenuItems, ...rightMenuItems]

    const isActive = (href: string) => pathname === href

    // Determine if navbar should be transparent (at top of page)
    const isTransparent = scrollY < 50

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`
                    hidden lg:block fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isTransparent
                        ? 'h-[90px] bg-transparent'
                        : 'h-[70px] bg-cream/95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md'}
                `}
            >
                <div className="max-w-7xl mx-auto h-full px-6">
                    <div className="flex items-center justify-between h-full">
                        {/* Left Menu */}
                        <div className="flex items-center space-x-8">
                            {leftMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group"
                                >
                                    <span className={`
                                        font-inter font-medium text-[15px] transition-colors duration-200
                                        ${isActive(item.href)
                                            ? isTransparent ? 'text-white font-semibold' : 'text-sage font-semibold'
                                            : isTransparent ? 'text-white/90 hover:text-white' : 'text-olive hover:text-sage'}
                                    `}>
                                        {item.label}
                                    </span>
                                    {/* Underline animation */}
                                    <span className={`
                                        absolute -bottom-1 left-0 h-0.5 transition-all duration-200 ease-out
                                        ${isTransparent ? 'bg-white' : 'bg-sage'}
                                        ${isActive(item.href)
                                            ? 'w-full'
                                            : 'w-0 group-hover:w-full'}
                                    `} />
                                </Link>
                            ))}
                        </div>

                        {/* Center Logo */}
                        <Link href="/" className="group relative">
                            <AnimatePresence mode="wait">
                                {isTransparent ? (
                                    <motion.h1
                                        key="text-logo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        whileHover={{ scale: 1.02 }}
                                        className="font-knewave text-[32px] text-white tracking-wide cursor-pointer drop-shadow-lg"
                                    >
                                        StayinUBUD
                                    </motion.h1>
                                ) : (
                                    <motion.div
                                        key="image-logo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        whileHover={{ scale: 1.02 }}
                                        className="h-[50px] w-[50px] relative cursor-pointer"
                                    >
                                        {/* Fallback text logo styled as circular */}
                                        <div className="w-full h-full rounded-full bg-sage flex items-center justify-center">
                                            <span className="font-knewave text-white text-xl">S</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Right Menu */}
                        <div className="flex items-center space-x-8">
                            {rightMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group"
                                >
                                    <span className={`
                                        font-inter font-medium text-[15px] transition-colors duration-200
                                        ${isActive(item.href)
                                            ? isTransparent ? 'text-white font-semibold' : 'text-sage font-semibold'
                                            : isTransparent ? 'text-white/90 hover:text-white' : 'text-olive hover:text-sage'}
                                    `}>
                                        {item.label}
                                    </span>
                                    <span className={`
                                        absolute -bottom-1 left-0 h-0.5 transition-all duration-200 ease-out
                                        ${isTransparent ? 'bg-white' : 'bg-sage'}
                                        ${isActive(item.href)
                                            ? 'w-full'
                                            : 'w-0 group-hover:w-full'}
                                    `} />
                                </Link>
                            ))}

                            {/* Book Now CTA */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Link
                                    href="/villas"
                                    className={`font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-150 ease-out
                                        ${isTransparent
                                            ? 'bg-white/20 text-white border-2 border-white/50 hover:bg-white hover:text-sage backdrop-blur-sm'
                                            : 'bg-sage text-white hover:bg-sage-dark hover:scale-105 hover:shadow-lg'}
                                    `}
                                >
                                    Book Now
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile/Tablet Navbar - Fixed at top */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300
                    ${isTransparent
                        ? 'bg-transparent'
                        : 'bg-cream/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)]'}
                `}
            >
                <div className="h-full px-4 flex items-center justify-between">
                    {/* Hamburger Menu */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors
                            ${isTransparent ? 'hover:bg-white/20' : 'hover:bg-sage/10'}
                        `}
                        aria-label="Open menu"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu size={24} className={isTransparent ? 'text-white' : 'text-olive'} />
                    </motion.button>

                    {/* Center Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                        <AnimatePresence mode="wait">
                            {isTransparent ? (
                                <motion.h1
                                    key="mobile-text-logo"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-knewave text-[24px] text-white tracking-wide drop-shadow-lg"
                                >
                                    StayinUBUD
                                </motion.h1>
                            ) : (
                                <motion.div
                                    key="mobile-image-logo"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-10 w-10 rounded-full bg-sage flex items-center justify-center"
                                >
                                    <span className="font-knewave text-white text-lg">S</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Phone Icon / CTA */}
                    <motion.a
                        href="tel:+6281234567890"
                        className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors
                            ${isTransparent
                                ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                : 'bg-sage text-white hover:bg-sage-dark'}
                        `}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Call us"
                    >
                        <Phone size={20} />
                    </motion.a>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Slide-in Menu */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-50 bg-cream lg:hidden overflow-y-auto"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-4">
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-sage/10 transition-colors"
                                    whileTap={{ scale: 0.95, rotate: 90 }}
                                    aria-label="Close menu"
                                >
                                    <X size={24} className="text-olive" />
                                </motion.button>
                            </div>

                            {/* Logo */}
                            <div className="px-6 mb-8">
                                <h2 className="font-knewave text-3xl text-sage">StayinUBUD</h2>
                                <p className="text-olive/60 text-sm mt-1">Luxury Villa Rentals in Ubud</p>
                            </div>

                            {/* Menu Items */}
                            <div className="px-6 space-y-1">
                                {allMenuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                                                block py-4 text-[24px] font-medium transition-colors border-b border-sage/10
                                                ${isActive(item.href)
                                                    ? 'text-sage font-semibold'
                                                    : 'text-olive hover:text-sage'}
                                            `}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="px-6 mt-8"
                            >
                                <Link
                                    href="/villas"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-sage text-white text-center font-semibold text-lg py-4 rounded-full
                                        hover:bg-sage-dark transition-colors"
                                >
                                    Book Now
                                </Link>
                            </motion.div>

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="px-6 mt-12 pb-8"
                            >
                                <p className="text-olive/60 text-sm mb-2">Need assistance?</p>
                                <a
                                    href="tel:+6281234567890"
                                    className="text-olive font-medium hover:text-sage transition-colors"
                                >
                                    +62 812 3456 7890
                                </a>
                                <p className="text-olive/60 text-sm mt-4">
                                    Ubud, Bali, Indonesia
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
