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
    Trash2,
    Loader2,
    FileText,
    Users,
    Shield,
    Mail
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AdminUser } from '@/types'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export default function AdminUsersPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<AdminUser[]>([])
    const [deleting, setDeleting] = useState<string | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [newRole, setNewRole] = useState<'admin' | 'super_admin'>('admin')
    const [adding, setAdding] = useState(false)
    const [currentUserEmail, setCurrentUserEmail] = useState('')

    useEffect(() => {
        checkAuth()
        fetchUsers()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
            return
        }
        setCurrentUserEmail(session.user.email || '')
    }

    async function fetchUsers() {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setUsers(data || [])
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string, email: string) {
        if (email === currentUserEmail) {
            alert('Anda tidak bisa menghapus akun sendiri')
            return
        }

        if (!confirm('Apakah Anda yakin ingin menghapus admin ini?')) return

        setDeleting(id)
        try {
            const { error } = await supabase
                .from('admin_users')
                .delete()
                .eq('id', id)

            if (error) throw error
            setUsers(users.filter(u => u.id !== id))
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('Gagal menghapus admin')
        } finally {
            setDeleting(null)
        }
    }

    async function handleAddUser(e: React.FormEvent) {
        e.preventDefault()

        if (!newEmail.trim()) {
            alert('Email wajib diisi')
            return
        }

        setAdding(true)
        try {
            const { error } = await supabase
                .from('admin_users')
                .insert({
                    email: newEmail.trim().toLowerCase(),
                    role: newRole,
                })

            if (error) throw error

            setNewEmail('')
            setNewRole('admin')
            setShowAddModal(false)
            fetchUsers()
        } catch (error: any) {
            console.error('Error adding user:', error)
            if (error.code === '23505') {
                alert('Email sudah terdaftar sebagai admin')
            } else {
                alert('Gagal menambahkan admin')
            }
        } finally {
            setAdding(false)
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const menuItems = [
        { href: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { href: '/admin/villas', icon: Home, label: 'Kelola Villa' },
        { href: '/admin/bookings', icon: Calendar, label: 'Kelola Booking' },
        { href: '/admin/blog', icon: FileText, label: 'Kelola Blog' },
        { href: '/admin/users', icon: Users, label: 'Admin Users', active: true },
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
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-olive">Admin Users</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center space-x-2 bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage-dark transition-colors"
                        >
                            <Plus size={20} />
                            <span>Tambah Admin</span>
                        </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            <strong>Catatan:</strong> Untuk login sebagai admin, user harus:
                            <br />1. Terdaftar di Supabase Authentication
                            <br />2. Email terdaftar di tabel admin_users ini
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 size={48} className="animate-spin text-sage mx-auto" />
                            <p className="mt-4 text-gray-600">Memuat data admin...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <Users size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada admin</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Email</th>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Role</th>
                                        <th className="text-left px-6 py-4 font-semibold text-olive">Tanggal Ditambahkan</th>
                                        <th className="text-right px-6 py-4 font-semibold text-olive">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {users.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                                                        <Mail size={18} className="text-sage" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-olive">{user.email}</p>
                                                        {user.email === currentUserEmail && (
                                                            <span className="text-xs text-sage">(Anda)</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${user.role === 'super_admin'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    <Shield size={14} />
                                                    <span>{user.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {format(parseISO(user.created_at), 'dd MMM yyyy', { locale: id })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end">
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.email)}
                                                        disabled={deleting === user.id || user.email === currentUserEmail}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                                        title={user.email === currentUserEmail ? 'Tidak bisa hapus akun sendiri' : 'Hapus'}
                                                    >
                                                        {deleting === user.id ? (
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

            {/* Add Admin Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
                    >
                        <h3 className="text-2xl font-bold text-olive mb-6">Tambah Admin Baru</h3>

                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Role
                                </label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as 'admin' | 'super_admin')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="flex items-center space-x-2 px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage-dark disabled:opacity-50"
                                >
                                    {adding ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Plus size={18} />
                                    )}
                                    <span>Tambah</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
