import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VillasList from '@/components/villas/VillasList'

export const metadata: Metadata = {
    title: 'Our Villas - StayinUBUD',
    description: 'Browse our collection of luxury villas in Ubud. Find your perfect retreat with private pools, rice field views, and premium amenities.',
}

export default function VillasPage() {
    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <div className="pt-24 pb-20">
                <VillasList />
            </div>
            <Footer />
        </main>
    )
}
