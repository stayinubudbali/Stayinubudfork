export interface Villa {
    id: string
    name: string
    description: string
    bedrooms: number
    bathrooms: number
    max_guests: number
    price_per_night: number
    amenities: string[]
    images: string[]
    location: string
    created_at: string
    updated_at: string
}

export interface Booking {
    id: string
    villa_id: string
    guest_name: string
    guest_email: string
    guest_phone: string | null
    check_in: string
    check_out: string
    total_guests: number
    total_price: number
    status: 'pending' | 'confirmed' | 'cancelled'
    special_requests: string | null
    created_at: string
    updated_at: string
    villa?: Villa
}

export interface AdminUser {
    id: string
    email: string
    role: 'admin' | 'super_admin'
    created_at: string
}

export interface BookingFormData {
    villa_id: string
    guest_name: string
    guest_email: string
    guest_phone?: string
    check_in: string
    check_out: string
    total_guests: number
    special_requests?: string
}

export interface VillaFilters {
    minPrice?: number
    maxPrice?: number
    minGuests?: number
    bedrooms?: number
}

export interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    cover_image: string | null
    author: string
    published: boolean
    created_at: string
    updated_at: string
}
