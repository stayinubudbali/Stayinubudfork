import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Privacy Policy - StayinUBUD',
    description: 'Our commitment to protecting your privacy and personal data.',
}

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
                        <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-500">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    StayinUBUD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our villa rental services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">2. Information We Collect</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">We may collect information about you in various ways:</p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li><strong>Personal Data:</strong> Name, email address, phone number, and billing information when you make a booking.</li>
                                    <li><strong>Booking Information:</strong> Check-in/check-out dates, number of guests, special requests.</li>
                                    <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time spent on our site.</li>
                                    <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Process and manage your villa bookings</li>
                                    <li>Communicate with you about your reservation</li>
                                    <li>Send promotional offers and newsletters (with your consent)</li>
                                    <li>Improve our website and services</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">4. Information Sharing</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">5. Data Security</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">6. Your Rights</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Access the personal data we hold about you</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Withdraw consent at any time</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">7. Cookies</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We use cookies to improve your experience on our website. You can choose to disable cookies through your browser settings, but this may affect some functionality of our site.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">8. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                                </p>
                                <div className="mt-4 p-6 bg-white border border-gray-100">
                                    <p className="text-gray-900 font-medium">StayinUBUD</p>
                                    <p className="text-gray-600">Email: privacy@stayinubud.com</p>
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
