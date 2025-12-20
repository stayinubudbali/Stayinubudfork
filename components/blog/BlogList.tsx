'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { BlogPost } from '@/types'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export default function BlogList() {
    const supabase = createClient()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4">
                <div className="text-center py-20">
                    <div className="animate-spin w-12 h-12 border-4 border-sage border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4">
            {posts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-600">Belum ada artikel</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                        >
                            {post.cover_image && (
                                <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </Link>
                            )}
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {format(parseISO(post.created_at), 'dd MMM yyyy', { locale: id })}
                                    </span>
                                    <span className="flex items-center">
                                        <User size={14} className="mr-1" />
                                        {post.author}
                                    </span>
                                </div>
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-bold text-olive mb-3 group-hover:text-sage transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>
                                {post.excerpt && (
                                    <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                                )}
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-sage font-medium hover:text-sage-dark transition-colors"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight size={18} className="ml-1" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    )
}
