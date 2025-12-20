'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bed, Bath, Users } from 'lucide-react'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface VillaCardProps {
    villa: Villa
    index?: number
}

export default function VillaCard({ villa, index = 0 }: VillaCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-lift">
                {/* Image */}
                <div className="relative h-64 image-zoom-container">
                    <Image
                        src={villa.images[0]}
                        alt={villa.name}
                        fill
                        className="object-cover image-zoom"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                        <div className="bg-sage text-white px-3 py-1 rounded-full text-sm font-medium">
                            {formatCurrency(villa.price_per_night)}/night
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-2xl font-semibold text-olive mb-2 group-hover:text-sage transition-colors">
                        {villa.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {villa.description}
                    </p>

                    {/* Features */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Bed size={18} className="text-sage" />
                            <span>{villa.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Bath size={18} className="text-sage" />
                            <span>{villa.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users size={18} className="text-sage" />
                            <span>{villa.max_guests} Guests</span>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {villa.amenities.slice(0, 3).map((amenity) => (
                            <span
                                key={amenity}
                                className="text-xs bg-cream text-olive px-2 py-1 rounded-full"
                            >
                                {amenity}
                            </span>
                        ))}
                        {villa.amenities.length > 3 && (
                            <span className="text-xs bg-cream text-olive px-2 py-1 rounded-full">
                                +{villa.amenities.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Button */}
                    <Link href={`/villas/${villa.id}`}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-sage text-white py-3 rounded-lg font-medium hover:bg-sage-dark transition-colors btn-ripple"
                        >
                            View Details
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
