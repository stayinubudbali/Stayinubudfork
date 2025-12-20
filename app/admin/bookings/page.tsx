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
    Eye,
    Check,
    X,
    Loader2,
    Clock,
    User,
    Mail,
    Phone,
    MessageCircle,
    FileText,
    Users
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Booking } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { differenceInDays, parseISO, format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function AdminBookingsPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

    useEffect(() => {
        checkAuth()
        fetchBookings()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
            return
        }
    }

    async function fetchBookings() {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
          *,
          villa:villas(name, location, images)
        `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setBookings(data || [])
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    async function updateStatus(id: string, status: 'confirmed' | 'cancelled') {
        setUpdatingId(id)
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id)

            if (error) throw error

            setBookings(bookings.map(b =>
                b.id === id ? { ...b, status } : b
            ))

            if (selectedBooking?.id === id) {
                setSelectedBooking({ ...selectedBooking, status })
            }
        } catch (error) {
            console.error('Error updating booking:', error)
            alert('Gagal mengupdate status')
        } finally {
            setUpdatingId(null)
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const filteredBookings = bookings.filter(b =>
        filter === 'all' ? true : b.status === filter
    )

    const menuItems = [
        { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/villas', icon: Home, label: 'Kelola Villa' },
        { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking', active: true },
        { href: '/admin/blog', icon: FileText, label: 'Kelola Blog' },
        { href: '/admin/users', icon: Users, label: 'Admin Users' },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-yellow-100 text-yellow-700'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'confirmed': return 'Dikonfirmasi'
            case 'cancelled': return 'Dibatalkan'
            default: return 'Menunggu'
        }
    }

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
                        <h2 className="text-3xl font-bold text-olive">Kelola Booking</h2>

                        {/* Filter */}
                        <div className="flex items-center space-x-2">
                            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === f
                                        ? 'bg-sage text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {f === 'all' ? 'Semua' : getStatusLabel(f)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 size={48} className="animate-spin text-sage mx-auto" />
                            <p className="mt-4 text-gray-600">Memuat data booking...</p>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada booking</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Booking List */}
                            <div className="lg:col-span-2 space-y-4">
                                {filteredBookings.map((booking) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`bg-white rounded-xl shadow p-5 cursor-pointer transition-all ${selectedBooking?.id === booking.id
                                            ? 'ring-2 ring-sage'
                                            : 'hover:shadow-lg'
                                            }`}
                                        onClick={() => setSelectedBooking(booking)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="font-mono text-sm text-gray-500">
                                                        #{booking.id.substring(0, 8).toUpperCase()}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                        {getStatusLabel(booking.status)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-olive text-lg">
                                                    {booking.villa?.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {booking.guest_name}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sage text-lg">
                                                    {formatCurrency(booking.total_price)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {differenceInDays(parseISO(booking.check_out), parseISO(booking.check_in))} malam
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t flex items-center text-sm text-gray-500">
                                            <Calendar size={14} className="mr-1" />
                                            {format(parseISO(booking.check_in), 'dd MMM', { locale: id })} - {format(parseISO(booking.check_out), 'dd MMM yyyy', { locale: id })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Booking Detail */}
                            <div className="lg:col-span-1">
                                {selectedBooking ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white rounded-xl shadow p-6 sticky top-8"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-olive">Detail Booking</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                                                {getStatusLabel(selectedBooking.status)}
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Villa */}
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Villa</p>
                                                <p className="font-semibold text-olive">{selectedBooking.villa?.name}</p>
                                            </div>

                                            {/* Dates */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Check-in</p>
                                                    <p className="font-medium">{formatDate(selectedBooking.check_in)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Check-out</p>
                                                    <p className="font-medium">{formatDate(selectedBooking.check_out)}</p>
                                                </div>
                                            </div>

                                            {/* Guest */}
                                            <div className="border-t pt-4">
                                                <p className="text-sm text-gray-500 mb-2">Tamu</p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm">
                                                        <User size={16} className="mr-2 text-sage" />
                                                        {selectedBooking.guest_name}
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <Mail size={16} className="mr-2 text-sage" />
                                                        {selectedBooking.guest_email}
                                                    </div>
                                                    {selectedBooking.guest_phone && (
                                                        <div className="flex items-center text-sm">
                                                            <Phone size={16} className="mr-2 text-sage" />
                                                            {selectedBooking.guest_phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="border-t pt-4">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Total</span>
                                                    <span className="text-xl font-bold text-sage">
                                                        {formatCurrency(selectedBooking.total_price)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Special Requests */}
                                            {selectedBooking.special_requests && (
                                                <div className="border-t pt-4">
                                                    <p className="text-sm text-gray-500 mb-1">Permintaan Khusus</p>
                                                    <p className="text-sm">{selectedBooking.special_requests}</p>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {selectedBooking.status === 'pending' && (
                                                <div className="border-t pt-4 flex space-x-2">
                                                    <button
                                                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                                                        disabled={updatingId === selectedBooking.id}
                                                        className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                                    >
                                                        {updatingId === selectedBooking.id ? (
                                                            <Loader2 size={18} className="animate-spin" />
                                                        ) : (
                                                            <Check size={18} />
                                                        )}
                                                        <span>Konfirmasi</span>
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                                                        disabled={updatingId === selectedBooking.id}
                                                        className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                                                    >
                                                        <X size={18} />
                                                        <span>Batalkan</span>
                                                    </button>
                                                </div>
                                            )}

                                            {/* WhatsApp */}
                                            {selectedBooking.guest_phone && (
                                                <a
                                                    href={`https://wa.me/${selectedBooking.guest_phone.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center space-x-2 w-full border-2 border-green-500 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
                                                >
                                                    <MessageCircle size={18} />
                                                    <span>Hubungi via WhatsApp</span>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                                        <Eye size={32} className="mx-auto mb-2 text-gray-300" />
                                        <p>Pilih booking untuk melihat detail</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
