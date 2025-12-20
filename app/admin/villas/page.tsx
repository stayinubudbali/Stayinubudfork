'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Home,
    Calendar,
    TrendingUp,
    LogOut,
    Plus,
    Edit,
    Trash2,
    Eye,
    Loader2,
    FileText,
    Users
} from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function AdminVillasPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [villas, setVillas] = useState<Villa[]>([])
    const [deleting, setDeleting] = useState<string | null>(null)

    useEffect(() => {
        checkAuth()
        fetchVillas()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
            return
        }
    }

    async function fetchVillas() {
        try {
            const { data, error } = await supabase
                .from('villas')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setVillas(data || [])
        } catch (error) {
            console.error('Error fetching villas:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Apakah Anda yakin ingin menghapus villa ini?')) return

        setDeleting(id)
        try {
            const { error } = await supabase
                .from('villas')
                .delete()
                .eq('id', id)

            if (error) throw error
            setVillas(villas.filter(v => v.id !== id))
        } catch (error) {
            console.error('Error deleting villa:', error)
            alert('Gagal menghapus villa')
        } finally {
            setDeleting(null)
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const menuItems = [
        { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/villas', icon: Home, label: 'Kelola Villa', active: true },
        { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking' },
        { href: '/admin/blog', icon: FileText, label: 'Kelola Blog' },
        { href: '/admin/users', icon: Users, label: 'Admin Users' },
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
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-olive">Kelola Villa</h2>
                        <Link
                            href="/admin/villas/new"
                            className="flex items-center space-x-2 bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage-dark transition-colors"
                        >
                            <Plus size={20} />
                            <span>Tambah Villa</span>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 size={48} className="animate-spin text-sage mx-auto" />
                            <p className="mt-4 text-gray-600">Memuat data villa...</p>
                        </div>
                    ) : villas.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <Home size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada villa</p>
                            <Link
                                href="/admin/villas/new"
                                className="inline-flex items-center space-x-2 bg-sage text-white px-4 py-2 rounded-lg mt-4 hover:bg-sage-dark transition-colors"
                            >
                                <Plus size={20} />
                                <span>Tambah Villa Pertama</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Villa</th>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Harga/Malam</th>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Kamar</th>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Maks Tamu</th>
                                        <th className="text-right px-6 py-4 font-semibold text-olive">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {villas.map((villa) => (
                                        <motion.tr
                                            key={villa.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={villa.images[0]}
                                                            alt={villa.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-olive">{villa.name}</p>
                                                        <p className="text-sm text-gray-500">{villa.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-sage">
                                                    {formatCurrency(villa.price_per_night)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {villa.bedrooms} kamar
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {villa.max_guests} orang
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/villas/${villa.id}`}
                                                        target="_blank"
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-sage"
                                                        title="Lihat di Website"
                                                    >
                                                        <Eye size={20} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/villas/${villa.id}/edit`}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <Edit size={20} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(villa.id)}
                                                        disabled={deleting === villa.id}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600 disabled:opacity-50"
                                                        title="Hapus"
                                                    >
                                                        {deleting === villa.id ? (
                                                            <Loader2 size={20} className="animate-spin" />
                                                        ) : (
                                                            <Trash2 size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
