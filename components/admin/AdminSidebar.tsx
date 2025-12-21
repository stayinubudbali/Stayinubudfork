'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    Home,
    Calendar,
    TrendingUp,
    LogOut,
    FileText,
    Users,
    ExternalLink,
    Leaf,
    MessageSquare
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const menuItems = [
    { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
    { href: '/admin/villas', icon: Home, label: 'Kelola Villa' },
    { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
    { href: '/admin/blog', icon: FileText, label: 'Kelola Blog' },
    { href: '/admin/users', icon: Users, label: 'Admin Users' },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <aside className="w-64 bg-olive-900 text-white p-6 flex flex-col fixed h-screen">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-olive-600 flex items-center justify-center">
                    <Leaf size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="font-display text-xl">StayinUBUD</h1>
                    <p className="text-xs text-white/50">Admin Panel</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 transition-all ${isActive
                                ? 'bg-olive-600 text-white'
                                : 'text-white/70 hover:bg-olive-600/50 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-white/10 pt-4 space-y-1">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-olive-600/50 hover:text-white transition-all"
                >
                    <ExternalLink size={18} />
                    <span className="text-sm">Lihat Website</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all"
                >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </aside>
    )
}
