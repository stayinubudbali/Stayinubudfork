import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl font-bold text-olive mb-12 text-center">Contact Us</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="inline-flex p-4 bg-sage/10 rounded-xl mb-4">
                                <Mail size={32} className="text-sage" />
                            </div>
                            <h3 className="font-semibold text-olive mb-2">Email Us</h3>
                            <a href="mailto:info@stayinubud.com" className="text-gray-600 hover:text-sage">
                                info@stayinubud.com
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="inline-flex p-4 bg-sage/10 rounded-xl mb-4">
                                <Phone size={32} className="text-sage" />
                            </div>
                            <h3 className="font-semibold text-olive mb-2">Call Us</h3>
                            <a href="tel:+62361234567" className="text-gray-600 hover:text-sage">
                                +62 361 234 567
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="inline-flex p-4 bg-sage/10 rounded-xl mb-4">
                                <MapPin size={32} className="text-sage" />
                            </div>
                            <h3 className="font-semibold text-olive mb-2">Visit Us</h3>
                            <p className="text-gray-600">
                                Jalan Raya Ubud<br />Ubud, Bali 80571
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
