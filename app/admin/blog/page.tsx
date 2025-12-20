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
    EyeOff,
    Loader2,
    FileText,
    Users
} from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { BlogPost } from '@/types'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export default function AdminBlogPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [deleting, setDeleting] = useState<string | null>(null)
    const [toggling, setToggling] = useState<string | null>(null)

    useEffect(() => {
        checkAuth()
        fetchPosts()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
            return
        }
    }

    async function fetchPosts() {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return

        setDeleting(id)
        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id)

            if (error) throw error
            setPosts(posts.filter(p => p.id !== id))
        } catch (error) {
            console.error('Error deleting post:', error)
            alert('Gagal menghapus artikel')
        } finally {
            setDeleting(null)
        }
    }

    async function togglePublish(id: string, currentStatus: boolean) {
        setToggling(id)
        try {
            const { error } = await supabase
                .from('blog_posts')
                .update({ published: !currentStatus })
                .eq('id', id)

            if (error) throw error
            setPosts(posts.map(p =>
                p.id === id ? { ...p, published: !currentStatus } : p
            ))
        } catch (error) {
            console.error('Error toggling post:', error)
            alert('Gagal mengubah status')
        } finally {
            setToggling(null)
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
        { href: '/admin/blog', icon: FileText, label: 'Kelola Blog', active: true },
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
                        <h2 className="text-3xl font-bold text-olive">Kelola Blog</h2>
                        <Link
                            href="/admin/blog/new"
                            className="flex items-center space-x-2 bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage-dark transition-colors"
                        >
                            <Plus size={20} />
                            <span>Tulis Artikel</span>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 size={48} className="animate-spin text-sage mx-auto" />
                            <p className="mt-4 text-gray-600">Memuat artikel...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada artikel</p>
                            <Link
                                href="/admin/blog/new"
                                className="inline-flex items-center space-x-2 bg-sage text-white px-4 py-2 rounded-lg mt-4 hover:bg-sage-dark transition-colors"
                            >
                                <Plus size={20} />
                                <span>Tulis Artikel Pertama</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow p-6 flex items-start space-x-6"
                                >
                                    {post.cover_image && (
                                        <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={post.cover_image}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="font-semibold text-olive text-lg">{post.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        {post.excerpt && (
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                                        )}
                                        <p className="text-xs text-gray-400">
                                            {format(parseISO(post.created_at), 'dd MMMM yyyy', { locale: id })} • {post.author}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => togglePublish(post.id, post.published)}
                                            disabled={toggling === post.id}
                                            className={`p-2 rounded-lg transition-colors ${post.published
                                                    ? 'hover:bg-yellow-50 text-yellow-600'
                                                    : 'hover:bg-green-50 text-green-600'
                                                }`}
                                            title={post.published ? 'Sembunyikan' : 'Publikasikan'}
                                        >
                                            {toggling === post.id ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : post.published ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            disabled={deleting === post.id}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600 disabled:opacity-50"
                                            title="Hapus"
                                        >
                                            {deleting === post.id ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={20} />
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
