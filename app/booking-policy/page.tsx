import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Booking Policy - StayinUBUD',
    description: 'Understanding our booking, cancellation, and refund policies.',
}

export default function BookingPolicyPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4">Policies</p>
                        <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">Booking Policy</h1>
                        <p className="text-gray-500">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">1. Reservation Process</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    To book a villa with StayinUBUD:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Select your preferred villa and dates</li>
                                    <li>Complete the booking form with your details</li>
                                    <li>Submit your reservation request</li>
                                    <li>Receive confirmation within 24 hours</li>
                                    <li>Complete payment as per the payment terms</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">2. Payment Terms</h2>
                                <div className="bg-olive-50 p-6 mb-4">
                                    <p className="text-olive-900 font-medium mb-2">Payment Schedule:</p>
                                    <ul className="list-disc pl-6 text-olive-800 space-y-2">
                                        <li><strong>Deposit:</strong> 50% of total booking amount due upon confirmation</li>
                                        <li><strong>Balance:</strong> Remaining 50% due 14 days before check-in</li>
                                        <li><strong>Short notice bookings:</strong> Full payment required for bookings made within 14 days of check-in</li>
                                    </ul>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    We accept bank transfers (BCA, Mandiri), credit cards (Visa, Mastercard), and PayPal. All transactions are processed securely.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">3. Cancellation Policy</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 mb-4">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Cancellation Period</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Refund Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-3 text-gray-600">More than 30 days before check-in</td>
                                                <td className="px-4 py-3 text-gray-600">Full refund (minus processing fees)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-600">15-30 days before check-in</td>
                                                <td className="px-4 py-3 text-gray-600">50% refund</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-600">7-14 days before check-in</td>
                                                <td className="px-4 py-3 text-gray-600">25% refund</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-600">Less than 7 days before check-in</td>
                                                <td className="px-4 py-3 text-gray-600">No refund</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Cancellations must be submitted in writing via email. The cancellation date is determined by the date we receive your written notice.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">4. Check-in & Check-out</h2>
                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <div className="p-6 bg-white border border-gray-100">
                                        <h3 className="font-display text-lg text-gray-900 mb-2">Check-in</h3>
                                        <p className="text-3xl font-display text-olive-600 mb-2">2:00 PM</p>
                                        <p className="text-gray-500 text-sm">Early check-in may be available upon request (subject to availability)</p>
                                    </div>
                                    <div className="p-6 bg-white border border-gray-100">
                                        <h3 className="font-display text-lg text-gray-900 mb-2">Check-out</h3>
                                        <p className="text-3xl font-display text-olive-600 mb-2">12:00 PM</p>
                                        <p className="text-gray-500 text-sm">Late check-out may be available upon request (additional charges may apply)</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">5. Security Deposit</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    A refundable security deposit may be required for certain properties. The deposit amount varies by villa and will be communicated at the time of booking. Deposits are returned within 7 days after check-out, minus any deductions for damages or additional charges.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">6. Modification Policy</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Booking modifications are subject to availability and may incur additional charges:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li><strong>Date changes:</strong> Free if requested 14+ days in advance</li>
                                    <li><strong>Villa changes:</strong> Subject to availability and price difference</li>
                                    <li><strong>Guest changes:</strong> Please notify us of any changes in guests</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">7. House Rules</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">All guests must adhere to villa house rules:</p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>No smoking inside the villa</li>
                                    <li>No parties or events without prior approval</li>
                                    <li>Pets are not allowed unless specified</li>
                                    <li>Quiet hours: 10:00 PM - 7:00 AM</li>
                                    <li>Respect neighbors and local community</li>
                                    <li>Report any damages immediately</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">8. What's Included</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-olive-50 border border-olive-100">
                                        <h3 className="font-display text-lg text-olive-900 mb-3">Included</h3>
                                        <ul className="space-y-2 text-olive-800">
                                            <li>✓ Daily housekeeping</li>
                                            <li>✓ Welcome amenities</li>
                                            <li>✓ WiFi access</li>
                                            <li>✓ Pool & garden maintenance</li>
                                            <li>✓ 24/7 concierge support</li>
                                            <li>✓ Airport transfer (select villas)</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-gray-50 border border-gray-100">
                                        <h3 className="font-display text-lg text-gray-900 mb-3">Additional Charges</h3>
                                        <ul className="space-y-2 text-gray-600">
                                            <li>• Private chef services</li>
                                            <li>• Spa treatments</li>
                                            <li>• Extra guest fees</li>
                                            <li>• Special occasion setups</li>
                                            <li>• Excursions & activities</li>
                                            <li>• Early check-in / late check-out</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl text-gray-900 mb-4">9. Contact for Bookings</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For booking inquiries or assistance:
                                </p>
                                <div className="mt-4 p-6 bg-white border border-gray-100">
                                    <p className="text-gray-900 font-medium">StayinUBUD Reservations</p>
                                    <p className="text-gray-600">Email: reservations@stayinubud.com</p>
                                    <p className="text-gray-600">Phone: +62 812 3456 7890</p>
                                    <p className="text-gray-600">WhatsApp: +62 812 3456 7890</p>
                                    <p className="text-gray-500 text-sm mt-2">Available: 9:00 AM - 9:00 PM (Bali Time)</p>
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
