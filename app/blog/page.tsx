import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogList from '@/components/blog/BlogList'

export const metadata = {
    title: 'Blog | StayinUBUD - Tips & Panduan Liburan di Bali',
    description: 'Baca artikel terbaru tentang tips liburan, destinasi wisata, dan panduan menginap di villa Ubud, Bali.',
}

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 bg-cream">
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
            </main>
            <Footer />
        </>
    )
}
