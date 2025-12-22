'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

interface WhatsAppButtonProps {
    phoneNumber?: string
    message?: string
}

export default function WhatsAppButton({
    phoneNumber = '6281234567890',
    message = 'Hello, I would like to inquire about your villas.'
}: WhatsAppButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Delay appearance for better perceived performance
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (!isLoaded) return null

    return (
        <div className="fixed bottom-8 right-8 z-40">
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute bottom-full right-0 mb-4 w-64 animate-scale-in">
                    <div className="bg-primary text-white p-4 relative">
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute top-2 right-2 text-white/60 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                        <p className="text-sm mb-3">
                            Need assistance? Chat with us directly.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm transition-colors"
                        >
                            Start Chat
                        </a>
                    </div>
                </div>
            )}

            {/* WhatsApp Button */}
            <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-lg animate-bounce-in"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={24} />
            </button>
        </div>
    )
}
