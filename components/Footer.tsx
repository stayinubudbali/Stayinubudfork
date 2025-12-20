'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        explore: [
            { label: 'Home', href: '/' },
            { label: 'Villas', href: '/villas' },
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cancellation Policy', href: '/cancellation' },
        ],
    }

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
    ]

    return (
        <footer className="bg-olive text-cream">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-knewave text-3xl text-sage mb-4">
                            StayinUBUD
                        </h2>
                        <p className="text-cream/80 mb-4 text-sm">
                            Experience luxury in the heart of Ubud. Premium villa rentals with authentic Balinese hospitality.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 rounded-full bg-sage/20 hover:bg-sage transition-colors smooth-transition"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Explore Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="font-semibold text-lg mb-4">Explore</h3>
                        <ul className="space-y-2">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-cream/80 hover:text-sage transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-cream/80 hover:text-sage transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-sm">
                                <MapPin size={18} className="text-sage mt-1 flex-shrink-0" />
                                <span className="text-cream/80">
                                    Jalan Raya Ubud, Ubud,<br />Bali 80571, Indonesia
                                </span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <Phone size={18} className="text-sage flex-shrink-0" />
                                <a
                                    href="tel:+62361234567" className="text-cream/80 hover:text-sage transition-colors">
                                    +62 361 234 567
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-sm">
                                <Mail size={18} className="text-sage flex-shrink-0" />
                                <a
                                    href="mailto:info@stayinubud.com" className="text-cream/80 hover:text-sage transition-colors">
                                    info@stayinubud.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 pt-8 border-t border-cream/20 text-center"
                >
                    <p className="text-cream/70 text-sm">
                        &copy; {currentYear} StayinUBUD. All rights reserved. Built with ❤️ in Bali.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
