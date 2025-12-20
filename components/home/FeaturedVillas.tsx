import { createClient } from '@/lib/supabase/server'
import VillaCard from '@/components/VillaCard'
import { Villa } from '@/types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function FeaturedVillas() {
    const supabase = await createClient()

    const { data: villas, error } = await supabase
        .from('villas')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching villas:', error)
        return null
    }

    if (!villas || villas.length === 0) {
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-olive mb-4">Featured Villas</h2>
                    <p className="text-gray-600">No villas available at the moment. Please check back later.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-olive mb-4">
                        Featured Villas
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Handpicked luxury villas offering the perfect blend of comfort,
                        style, and authentic Balinese charm.
                    </p>
                </div>

                {/* Villa Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {villas.map((villa: Villa, index: number) => (
                        <VillaCard key={villa.id} villa={villa} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/villas"
                        className="inline-flex items-center space-x-2 bg-sage text-white px-8 py-4 rounded-full font-semibold hover:bg-sage-dark transition-all smooth-transition shadow-lg hover:shadow-xl group"
                    >
                        <span>View All Villas</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
