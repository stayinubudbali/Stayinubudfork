'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Home,
    Calendar,
    TrendingUp,
    LogOut,
    ArrowLeft,
    Plus,
    X,
    Loader2,
    Image as ImageIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AddVillaPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        price_per_night: 2500000,
        location: 'Ubud, Bali',
        amenities: ['WiFi', 'Private Pool', 'Air Conditioning'],
        images: [''],
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.description) {
            alert('Nama dan deskripsi wajib diisi')
            return
        }

        if (formData.images.filter(img => img.trim()).length === 0) {
            alert('Minimal 1 gambar wajib diisi')
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase
                .from('villas')
                .insert({
                    name: formData.name,
                    description: formData.description,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    max_guests: formData.max_guests,
                    price_per_night: formData.price_per_night,
                    location: formData.location,
                    amenities: formData.amenities.filter(a => a.trim()),
                    images: formData.images.filter(img => img.trim()),
                })

            if (error) throw error

            router.push('/admin/villas')
        } catch (error) {
            console.error('Error adding villa:', error)
            alert('Gagal menambahkan villa')
        } finally {
            setLoading(false)
        }
    }

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] })
    }

    const removeImageField = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index)
        })
    }

    const updateImage = (index: number, value: string) => {
        const newImages = [...formData.images]
        newImages[index] = value
        setFormData({ ...formData, images: newImages })
    }

    const addAmenity = () => {
        setFormData({ ...formData, amenities: [...formData.amenities, ''] })
    }

    const removeAmenity = (index: number) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter((_, i) => i !== index)
        })
    }

    const updateAmenity = (index: number, value: string) => {
        const newAmenities = [...formData.amenities]
        newAmenities[index] = value
        setFormData({ ...formData, amenities: newAmenities })
    }

    const menuItems = [
        { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/villas', icon: Home, label: 'Kelola Villa', active: true },
        { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-olive text-cream p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="font-knewave text-3xl text-sage">StayinUBUD</h1>
                    <p className="text-sm text-cream/70">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-sage text-white' : 'hover:bg-sage/20'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/admin/login')
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4 mb-8">
                        <Link
                            href="/admin/villas"
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={24} className="text-olive" />
                        </Link>
                        <h2 className="text-3xl font-bold text-olive">Tambah Villa Baru</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Nama Villa *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Villa Taman Surga"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Deskripsi *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Deskripsi lengkap villa..."
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20 resize-none"
                                />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Ubud, Bali"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Harga per Malam (IDR) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price_per_night}
                                    onChange={(e) => setFormData({ ...formData, price_per_night: parseInt(e.target.value) })}
                                    min="100000"
                                    step="100000"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Bedrooms */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Jumlah Kamar Tidur
                                </label>
                                <input
                                    type="number"
                                    value={formData.bedrooms}
                                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                                    min="1"
                                    max="10"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Jumlah Kamar Mandi
                                </label>
                                <input
                                    type="number"
                                    value={formData.bathrooms}
                                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                                    min="1"
                                    max="10"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Max Guests */}
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Maksimal Tamu
                                </label>
                                <input
                                    type="number"
                                    value={formData.max_guests}
                                    onChange={(e) => setFormData({ ...formData, max_guests: parseInt(e.target.value) })}
                                    min="1"
                                    max="20"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            {/* Images */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    URL Gambar *
                                </label>
                                <div className="space-y-2">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="flex space-x-2">
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => updateImage(index, e.target.value)}
                                                placeholder="https://images.unsplash.com/..."
                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                            />
                                            {formData.images.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageField(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="flex items-center space-x-2 text-sage hover:text-sage-dark"
                                    >
                                        <Plus size={18} />
                                        <span>Tambah Gambar</span>
                                    </button>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Fasilitas
                                </label>
                                <div className="space-y-2">
                                    {formData.amenities.map((amenity, index) => (
                                        <div key={index} className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={amenity}
                                                onChange={(e) => updateAmenity(index, e.target.value)}
                                                placeholder="Private Pool"
                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeAmenity(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addAmenity}
                                        className="flex items-center space-x-2 text-sage hover:text-sage-dark"
                                    >
                                        <Plus size={18} />
                                        <span>Tambah Fasilitas</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-8 flex justify-end space-x-4">
                            <Link
                                href="/admin/villas"
                                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center space-x-2 px-6 py-3 bg-sage text-white rounded-lg hover:bg-sage-dark transition-colors disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        <span>Tambah Villa</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
