import { Suspense } from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BlogList from '@/components/blog/BlogList'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
    title: 'Journal | StayinUBUD - Tips & Panduan Liburan di Bali',
    description: 'Baca artikel terbaru tentang tips liburan, destinasi wisata, dan panduan menginap di villa Ubud, Bali.',
}

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <PageHeader
                title="Journal"
                subtitle="Tips, panduan, dan cerita inspiratif seputar liburan di Bali"
                backgroundImage="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80"
                breadcrumbs={[{ label: 'Journal' }]}
                height="medium"
            />
            <section className="py-16">
                <Suspense fallback={
                    <div className="container mx-auto px-4">
                        <div className="text-center py-20">
                            <div className="animate-spin w-12 h-12 border-4 border-sage border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-600">Memuat artikel...</p>
                        </div>
                    </div>
                }>
                    <BlogList />
                </Suspense>
            </section>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
