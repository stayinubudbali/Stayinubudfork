import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl font-bold text-olive mb-6">About StayinUBUD</h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Welcome to StayinUBUD, your gateway to luxury villa experiences in the heart of Ubud, Bali.
                    </p>
                    <p className="text-gray-700 mb-4">
                        We specialize in curating exceptional villa rentals that combine authentic Balinese charm with modern luxury amenities. Each property in our collection has been carefully selected to ensure you experience the very best that Ubud has to offer.
                    </p>
                    <p className="text-gray-700">
                        From stunning rice terrace views to private infinity pools, our villas provide the perfect sanctuary for your Balinese adventure.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
