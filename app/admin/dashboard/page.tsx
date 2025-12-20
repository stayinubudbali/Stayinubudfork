'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Calendar, Settings, LogOut, DollarSign, TrendingUp, Users as UsersIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export default function AdminDashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        totalVillas: 0,
        pendingBookings: 0,
    })

    const supabase = createClient()

    useEffect(() => {
        checkAuth()
        fetchStats()
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

    async function fetchStats() {
        try {
            // Total bookings
            const { count: bookingsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })

            // Total revenue
            const { data: revenueData } = await supabase
                .from('bookings')
                .select('total_price')
                .in('status', ['confirmed', 'pending'])

            const totalRevenue = revenueData?.reduce((sum, booking) => sum + Number(booking.total_price), 0) || 0

            // Total villas
            const { count: villasCount } = await supabase
                .from('villas')
                .select('*', { count: 'exact', head: true })

            // Pending bookings
            const { count: pendingCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            setStats({
                totalBookings: bookingsCount || 0,
                totalRevenue,
                totalVillas: villasCount || 0,
                pendingBookings: pendingCount || 0,
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
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
        { href: '/admin/villas', icon: Home, label: 'Manage Villas' },
        { href: '/admin/bookings', icon: Calendar, label: 'Manage Bookings' },
        { href: '/admin/calendar', icon: Calendar, label: 'Calendar View' },
    ]

    const statCards = [
        { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'bg-blue-500' },
        { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'bg-green-500' },
        { label: 'Total Villas', value: stats.totalVillas, icon: Home, color: 'bg-purple-500' },
        { label: 'Pending Bookings', value: stats.pendingBookings, icon: UsersIcon, color: 'bg-orange-500' },
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
                    <h2 className="text-3xl font- text-olive mb-8">Dashboard Overview</h2>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin w-12 h-12 border-4 border-sage border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading stats...</p>
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
                                        <p className="text-3xl font-bold text-olive">{card.value}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-olive mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Link
                                        href="/admin/villas"
                                        className="bg-sage text-white px-6 py-4 rounded-lg text-center hover:bg-sage-dark transition-colors"
                                    >
                                        Manage Villas
                                    </Link>
                                    <Link
                                        href="/admin/bookings"
                                        className="bg-olive text-cream px-6 py-4 rounded-lg text-center hover:bg-olive/90 transition-colors"
                                    >
                                        View Bookings
                                    </Link>
                                    <Link
                                        href="/admin/calendar"
                                        className="border-2 border-sage text-sage px-6 py-4 rounded-lg text-center hover:bg-sage hover:text-white transition-colors"
                                    >
                                        Calendar
                                    </Link>
                                    <Link
                                        href="/"
                                        className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg text-center hover:border-sage hover:text-sage transition-colors"
                                    >
                                        View Website
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
