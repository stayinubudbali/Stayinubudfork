import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Terms of Service - StayinUBUD',
    description: 'Terms and conditions for using StayinUBUD villa rental services.',
}

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
                        <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">Terms of Service</h1>
                        <p className="text-gray-500">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    By accessing and using the StayinUBUD website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">2. Description of Services</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    StayinUBUD provides an online platform for booking luxury villa accommodations in Ubud, Bali. We act as an intermediary between guests and villa owners, facilitating reservations and providing concierge services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">3. User Responsibilities</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">As a user of our services, you agree to:</p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Provide accurate and complete information when making bookings</li>
                                    <li>Use our services only for lawful purposes</li>
                                    <li>Respect the property and follow villa rules</li>
                                    <li>Not engage in any fraudulent activities</li>
                                    <li>Be responsible for all activities under your account</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">4. Booking and Reservations</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    All bookings are subject to availability and confirmation. By making a reservation, you agree to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Pay all applicable fees and charges</li>
                                    <li>Adhere to check-in and check-out times</li>
                                    <li>Comply with the maximum guest occupancy</li>
                                    <li>Follow our cancellation and booking policies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">5. Pricing and Payment</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All prices are listed in Indonesian Rupiah (IDR). Prices may be subject to change without prior notice. Payment must be made in full according to the payment terms specified at the time of booking. Additional fees may apply for extra services or amenities.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">6. Intellectual Property</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All content on the StayinUBUD website, including text, graphics, logos, images, and software, is the property of StayinUBUD or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">7. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    StayinUBUD shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our liability is limited to the amount paid for the booking in question.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">8. Force Majeure</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, or other force majeure events.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">9. Governing Law</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bali, Indonesia.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">10. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">11. Contact Information</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For questions about these Terms of Service, please contact us:
                                </p>
                                <div className="mt-4 p-6 bg-white border border-gray-100">
                                    <p className="text-gray-900 font-medium">StayinUBUD</p>
                                    <p className="text-gray-600">Email: legal@stayinubud.com</p>
                                    <p className="text-gray-600">Phone: +62 812 3456 7890</p>
                                    <p className="text-gray-600">Address: Ubud, Bali, Indonesia</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
