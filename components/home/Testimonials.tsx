'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)

    const testimonials = [
        {
            name: 'Sarah Johnson',
            location: 'Los Angeles, USA',
            rating: 5,
            text: 'Our stay at Villa Taman Surga was absolutely magical. The rice field views, the infinity pool, and the incredible service made it the perfect honeymoon destination. We can\'t wait to return!',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        },
        {
            name: 'Michael Chen',
            location: 'Singapore',
            rating: 5,
            text: 'Villa Lotus Dream exceeded all expectations. The attention to detail, the luxurious amenities, and the breathtaking valley views created an unforgettable family vacation. Highly recommended!',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        },
        {
            name: 'Emma Williams',
            location: 'Melbourne, Australia',
            rating: 5,
            text: 'Villa Bambu Retreat was our peaceful sanctuary. Waking up to jungle sounds, enjoying the outdoor bath, and experiencing true Balinese hospitality was beyond amazing. A hidden gem!',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <section className="py-20 bg-olive text-cream">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Guest Experiences
                    </h2>
                    <p className="text-xl text-cream/80 max-w-2xl mx-auto">
                        Hear from our guests about their unforgettable stays in Ubud
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: index === activeIndex ? 1 : 0,
                                    display: index === activeIndex ? 'block' : 'none',
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <Quote size={48} className="text-sage mx-auto mb-6 opacity-50" />

                                {/* Stars */}
                                <div className="flex justify-center mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className="text-sage fill-sage"
                                        />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-xl md:text-2xl text-cream/90 mb-8 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sage">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-lg">{testimonial.name}</p>
                                        <p className="text-cream/70 text-sm">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-2 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                                        ? 'bg-sage w-8'
                                        : 'bg-cream/30 hover:bg-cream/50'
                                    }`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
