'use client'

import { motion } from 'framer-motion'
import { Wifi, Droplets, Utensils, Car, Trees, Heart } from 'lucide-react'

export default function Features() {
    const features = [
        {
            icon: Droplets,
            title: 'Private Pools',
            description: 'Every villa features a pristine private pool for your exclusive enjoyment',
        },
        {
            icon: Wifi,
            title: 'High-Speed WiFi',
            description: 'Stay connected with complimentary high-speed internet throughout',
        },
        {
            icon: Utensils,
            title: 'Gourmet Kitchens',
            description: 'Fully equipped kitchens with modern appliances and cookware',
        },
        {
            icon: Car,
            title: 'Free Parking',
            description: 'Secure on-site parking available for all guests',
        },
        {
            icon: Trees,
            title: 'Garden Views',
            description: 'Lush tropical gardens and stunning rice terrace vistas',
        },
        {
            icon: Heart,
            title: 'Daily Housekeeping',
            description: 'Professional housekeeping service to maintain your comfort',
        },
    ]

    return (
        <section className="py-20 bg-cream/50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-olive mb-4">
                        Premium Amenities
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Every villa is thoughtfully designed with world-class amenities to
                        ensure your stay is nothing short of extraordinary.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
                            >
                                <div className="mb-4">
                                    <div className="inline-flex p-4 bg-sage/10 rounded-xl group-hover:bg-sage/20 transition-colors">
                                        <Icon size={32} className="text-sage" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-olive mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
