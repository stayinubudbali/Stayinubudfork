import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedVillas from '@/components/home/FeaturedVillas'
import Features from '@/components/home/Features'
import Testimonials from '@/components/home/Testimonials'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'StayinUBUD - Luxury Villa Rentals in Ubud, Bali',
  description: 'Experience luxury in the heart of Ubud with our premium villa rentals. Private pools, stunning rice field views, and authentic Balinese hospitality.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedVillas />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  )
}
