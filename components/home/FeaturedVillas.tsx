'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Villa } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Fallback data jika database kosong
const fallbackVillas = [
    {
        id: '1',
        name: 'Villa Taman Surga',
        price_per_night: 4500000,
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
        location: 'Ubud, Bali'
    },
    {
        id: '2',
        name: 'Villa Lotus Dream',
        price_per_night: 5500000,
        bedrooms: 4,
        bathrooms: 4,
        max_guests: 8,
        images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
        location: 'Ubud, Bali'
    },
    {
        id: '3',
        name: 'Villa Bambu Retreat',
        price_per_night: 3800000,
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80'],
        location: 'Ubud, Bali'
    },
    {
        id: '4',
        name: 'Villa Sawah Indah',
        price_per_night: 6200000,
        bedrooms: 5,
        bathrooms: 5,
        max_guests: 10,
        images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80'],
        location: 'Ubud, Bali'
    },
    {
        id: '5',
        name: 'Villa Harmony',
        price_per_night: 4200000,
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
        location: 'Ubud, Bali'
    },
]

export default function FeaturedVillas() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [villas, setVillas] = useState<Villa[]>([])
    const [loading, setLoading] = useState(true)

    // Memoize supabase client to prevent re-creation
    const supabase = useMemo(() => createClient(), [])

    useEffect(() => {
        async function fetchVillas() {
            try {
                const { data, error } = await supabase
                    .from('villas')
                    .select('*')
                    .limit(5)
                    .order('created_at', { ascending: false })

                if (!error && data && data.length > 0) {
                    setVillas(data)
                } else {
                    setVillas(fallbackVillas as Villa[])
                }
            } catch {
                setVillas(fallbackVillas as Villa[])
            }
            setLoading(false)
        }
        fetchVillas()
    }, [supabase])

    if (loading) {
        return (
            <section className="py-32 bg-cream">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="mb-16">
                        <div className="h-8 w-48 bg-light animate-pulse mb-4" />
                        <div className="h-16 w-96 bg-light animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                        <div className="col-span-2 row-span-2 aspect-square bg-light animate-pulse" />
                        <div className="aspect-square bg-light animate-pulse" />
                        <div className="aspect-square bg-light animate-pulse" />
                        <div className="row-span-2 aspect-[1/2] bg-light animate-pulse" />
                        <div className="aspect-square bg-light animate-pulse" />
                    </div>
                </div>
            </section>
        )
    }

    const displayVillas = villas.length > 0 ? villas : fallbackVillas

    return (
        <section ref={ref} className="py-32 bg-cream">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">
                            Featured Collection
                        </p>
                        <h2 className="font-display text-display-lg text-primary">
                            Selected <span className="italic">Villas</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link
                            href="/villas"
                            className="inline-flex items-center gap-2 text-primary text-sm tracking-[0.2em] uppercase group"
                        >
                            <span>View All</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {displayVillas.slice(0, 5).map((villa, index) => {
                        const gridClasses = [
                            'col-span-2 row-span-2',
                            'col-span-1 row-span-1',
                            'col-span-1 row-span-1',
                            'col-span-1 row-span-2',
                            'col-span-1 row-span-1',
                        ]

                        const aspectClasses = [
                            'aspect-square',
                            'aspect-square',
                            'aspect-square',
                            'aspect-[1/2]',
                            'aspect-square',
                        ]

                        return (
                            <motion.div
                                key={villa.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`${gridClasses[index] || 'col-span-1'} relative group overflow-hidden bg-secondary`}
                            >
                                <Link href={`/villas/${villa.id}`} className="block h-full">
                                    <div className={`relative ${aspectClasses[index] || 'aspect-square'} w-full h-full`}>
                                        <Image
                                            src={villa.images[0]}
                                            alt={villa.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 flex flex-col justify-end p-6">
                                            <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                                                    From {formatCurrency(villa.price_per_night)}/night
                                                </p>
                                                <h3 className="text-white font-display text-2xl md:text-3xl mb-2">
                                                    {villa.name}
                                                </h3>
                                                <p className="text-white/70 text-sm">
                                                    {villa.bedrooms} Bedrooms · {villa.max_guests} Guests
                                                </p>
                                            </div>
                                        </div>

                                        {/* Corner Arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <ArrowUpRight size={18} className="text-primary" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 pt-16 border-t border-primary/10 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    <div>
                        <p className="font-display text-5xl text-primary mb-2">25+</p>
                        <p className="text-muted text-sm tracking-wide">Curated Properties</p>
                    </div>
                    <div>
                        <p className="font-display text-5xl text-primary mb-2">8</p>
                        <p className="text-muted text-sm tracking-wide">Years Excellence</p>
                    </div>
                    <div>
                        <p className="font-display text-5xl text-primary mb-2">4.9</p>
                        <p className="text-muted text-sm tracking-wide">Guest Rating</p>
                    </div>
                    <div>
                        <p className="font-display text-5xl text-primary mb-2">2K+</p>
                        <p className="text-muted text-sm tracking-wide">Happy Guests</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
