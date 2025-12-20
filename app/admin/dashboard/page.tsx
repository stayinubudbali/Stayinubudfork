'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    Home,
    Calendar,
    TrendingUp,
    LogOut,
    DollarSign,
    Users as UsersIcon,
    Clock,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    FileText,
    Users
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Booking } from '@/types'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function AdminDashboard() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        totalVillas: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
    })
    const [recentBookings, setRecentBookings] = useState<Booking[]>([])

    useEffect(() => {
        checkAuth()
        fetchData()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            router.push('/admin/login')
            return
        }

        // Check if user is admin
        const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', session.user.email)
            .single()

        if (!adminData) {
            await supabase.auth.signOut()
            router.push('/admin/login')
        }
    }

    async function fetchData() {
        try {
            // Total bookings
            const { count: bookingsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })

            // Total revenue (confirmed only)
            const { data: revenueData } = await supabase
                .from('bookings')
                .select('total_price')
                .eq('status', 'confirmed')

            const totalRevenue = revenueData?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0

            // Total villas
            const { count: villasCount } = await supabase
                .from('villas')
                .select('*', { count: 'exact', head: true })

            // Pending bookings
            const { count: pendingCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            // Confirmed bookings
            const { count: confirmedCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'confirmed')

            // Recent bookings
            const { data: recentData } = await supabase
                .from('bookings')
                .select(`
          *,
          villa:villas(name)
        `)
                .order('created_at', { ascending: false })
                .limit(5)

            setStats({
                totalBookings: bookingsCount || 0,
                totalRevenue,
                totalVillas: villasCount || 0,
                pendingBookings: pendingCount || 0,
                confirmedBookings: confirmedCount || 0,
            })
            setRecentBookings(recentData || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const menuItems = [
        { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard', active: true },
        { href: '/admin/villas', icon: Home, label: 'Kelola Villa' },
        { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking' },
        { href: '/admin/blog', icon: FileText, label: 'Kelola Blog' },
        { href: '/admin/users', icon: Users, label: 'Admin Users' },
    ]

    const statCards = [
        { label: 'Total Booking', value: stats.totalBookings, icon: Calendar, color: 'bg-blue-500' },
        { label: 'Total Pendapatan', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'bg-green-500' },
        { label: 'Total Villa', value: stats.totalVillas, icon: Home, color: 'bg-purple-500' },
        { label: 'Menunggu Konfirmasi', value: stats.pendingBookings, icon: Clock, color: 'bg-yellow-500' },
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
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active
                                ? 'bg-sage text-white'
                                : 'hover:bg-sage/20'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-cream/20 pt-4 mb-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-sage/20 transition-colors"
                    >
                        <ArrowUpRight size={20} />
                        <span>Lihat Website</span>
                    </Link>
                </div>

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
                    <h2 className="text-3xl font-bold text-olive mb-8">Dashboard</h2>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin w-12 h-12 border-4 border-sage border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-600">Memuat data...</p>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {statCards.map((card, index) => (
                                    <motion.div
                                        key={card.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                                                <card.icon size={24} className="text-white" />
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-1">{card.label}</p>
                                        <p className="text-2xl font-bold text-olive">{card.value}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick Stats Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Booking Dikonfirmasi</p>
                                        <p className="text-2xl font-bold text-olive">{stats.confirmedBookings}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <Clock size={24} className="text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Menunggu Konfirmasi</p>
                                        <p className="text-2xl font-bold text-olive">{stats.pendingBookings}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Home size={24} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Villa Aktif</p>
                                        <p className="text-2xl font-bold text-olive">{stats.totalVillas}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Bookings */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-olive">Booking Terbaru</h3>
                                    <Link
                                        href="/admin/bookings"
                                        className="text-sage hover:text-sage-dark font-medium text-sm"
                                    >
                                        Lihat Semua →
                                    </Link>
                                </div>
                                {recentBookings.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        Belum ada booking
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">ID</th>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Tamu</th>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Villa</th>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Tanggal</th>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Total</th>
                                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {recentBookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-mono text-sm text-gray-500">
                                                        #{booking.id.substring(0, 8).toUpperCase()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-olive">{booking.guest_name}</p>
                                                        <p className="text-sm text-gray-500">{booking.guest_email}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {booking.villa?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {format(parseISO(booking.check_in), 'dd MMM', { locale: id })} - {format(parseISO(booking.check_out), 'dd MMM', { locale: id })}
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-sage">
                                                        {formatCurrency(booking.total_price)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                            {getStatusLabel(booking.status)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link
                                    href="/admin/villas"
                                    className="bg-sage text-white px-6 py-4 rounded-xl text-center font-medium hover:bg-sage-dark transition-colors"
                                >
                                    Kelola Villa
                                </Link>
                                <Link
                                    href="/admin/bookings"
                                    className="bg-olive text-cream px-6 py-4 rounded-xl text-center font-medium hover:bg-olive/90 transition-colors"
                                >
                                    Kelola Booking
                                </Link>
                                <Link
                                    href="/admin/villas/new"
                                    className="border-2 border-sage text-sage px-6 py-4 rounded-xl text-center font-medium hover:bg-sage hover:text-white transition-colors"
                                >
                                    Tambah Villa
                                </Link>
                                <Link
                                    href="/"
                                    target="_blank"
                                    className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl text-center font-medium hover:border-sage hover:text-sage transition-colors"
                                >
                                    Lihat Website
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
