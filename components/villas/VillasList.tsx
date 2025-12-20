'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Villa } from '@/types'
import VillaCard from '@/components/VillaCard'
import VillaCardSkeleton from '@/components/Skeletons'

export default function VillasList() {
    const [villas, setVillas] = useState<Villa[]>([])
    const [filteredVillas, setFilteredVillas] = useState<Villa[]>([])
    const [loading, setLoading] = useState(true)
    const [showFilters, setShowFilters] = useState(false)

    // Filter states
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [minGuests, setMinGuests] = useState<number>(0)
    const [bedrooms, setBedrooms] = useState<number>(0)

    const supabase = createClient()

    useEffect(() => {
        fetchVillas()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [villas, priceRange, minGuests, bedrooms])

    async function fetchVillas() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('villas')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setVillas(data || [])
            setFilteredVillas(data || [])
        } catch (error) {
            console.error('Error fetching villas:', error)
        } finally {
            setLoading(false)
        }
    }

    function applyFilters() {
        let filtered = [...villas]

        // Price filter
        filtered = filtered.filter(
            (villa) =>
                villa.price_per_night >= priceRange[0] &&
                villa.price_per_night <= priceRange[1]
        )

        // Guests filter
        if (minGuests > 0) {
            filtered = filtered.filter((villa) => villa.max_guests >= minGuests)
        }

        // Bedrooms filter
        if (bedrooms > 0) {
            filtered = filtered.filter((villa) => villa.bedrooms >= bedrooms)
        }

        setFilteredVillas(filtered)
    }

    function resetFilters() {
        setPriceRange([0, 1000])
        setMinGuests(0)
        setBedrooms(0)
    }

    return (
        <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-olive mb-4">
                    Our Luxury Villas
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover your perfect sanctuary in the heart of Ubud
                </p>
            </motion.div>

            {/* Filters Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 text-olive hover:text-sage transition-colors"
                        >
                            <SlidersHorizontal size={20} />
                            <span className="font-medium">
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </span>
                        </button>
                        <div className="text-sm text-gray-600">
                            {filteredVillas.length} {filteredVillas.length === 1 ? 'villa' : 'villas'} found
                        </div>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t"
                        >
                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Price Range (per night)
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        step="50"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-sage"
                                    />
                                    <div className="text-sm text-gray-600">
                                        Up to ${priceRange[1]}
                                    </div>
                                </div>
                            </div>

                            {/* Min Guests */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Minimum Guests
                                </label>
                                <select
                                    value={minGuests}
                                    onChange={(e) => setMinGuests(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                >
                                    <option value="0">Any</option>
                                    <option value="2">2+</option>
                                    <option value="4">4+</option>
                                    <option value="6">6+</option>
                                    <option value="8">8+</option>
                                </select>
                            </div>

                            {/* Bedrooms */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Bedrooms
                                </label>
                                <select
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                >
                                    <option value="0">Any</option>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>

                            {/* Reset Button */}
                            <div className="flex items-end">
                                <button
                                    onClick={resetFilters}
                                    className="w-full px-4 py-2 border-2 border-sage text-sage rounded-lg hover:bg-sage hover:text-white transition-all"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Villas Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <VillaCardSkeleton key={i} />
                    ))}
                </div>
            ) : filteredVillas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVillas.map((villa, index) => (
                        <VillaCard key={villa.id} villa={villa} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Filter size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-olive mb-2">
                        No villas found
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Try adjusting your filters to see more results
                    </p>
                    <button
                        onClick={resetFilters}
                        className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    )
}
