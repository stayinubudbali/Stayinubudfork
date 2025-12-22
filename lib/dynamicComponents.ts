/**
 * Dynamic component imports for code splitting
 * These components are loaded on-demand to reduce initial bundle size
 */

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/Skeleton'

// Heavy animation components - load only when needed
export const ModernBookingFlow = dynamic(
    () => import('@/components/ModernBookingFlow'),
    {
        loading: () => (
            <div className= "min-h-screen flex items-center justify-center" >
            <div className="space-y-4 w-full max-w-2xl px-4">
                <Skeleton height={ 60} />
<Skeleton height={ 400} />
<div className="flex gap-4" >
<Skeleton height={ 50} className = "flex-1" />
<Skeleton height={ 50} className = "flex-1" />
</div>
</div>
</div>
),
    ssr: false, // Client-side only for booking flow
    }
)

// Map component - heavy with Leaflet/Mapbox
export const VillaMap = dynamic(
    () => import('@/components/villas/VillaMap'),
    {
        loading: () => <Skeleton height={ 400} className = "w-full rounded" />,
    ssr: false, // Maps don't need SSR
    }
)

// Calendar component - heavy with date-fns
export const BookingCalendar = dynamic(
    () => import('@/components/BookingCalendar'),
    {
        loading: () => <Skeleton height={ 350} className = "w-full" />,
    ssr: false,
    }
)

// Chart components for admin analytics
export const AnalyticsCharts = dynamic(
    () => import('@/components/admin/AnalyticsCharts'),
    {
        loading: () => (
            <div className= "grid grid-cols-1 md:grid-cols-2 gap-6" >
            <Skeleton height={ 300} />
<Skeleton height={ 300} />
<Skeleton height={ 300} />
<Skeleton height={ 300} />
</div>
),
    ssr: false,
    }
)

// Rich text editor for admin
export const RichTextEditor = dynamic(
    () => import('@/components/admin/RichTextEditor'),
    {
        loading: () => <Skeleton height={ 400} />,
    ssr: false,
    }
)

// Image gallery with lightbox
export const ImageGallery = dynamic(
    () => import('@/components/ImageGallery'),
    {
        loading: () => (
            <div className= "grid grid-cols-2 md:grid-cols-4 gap-4" >
            {
                [...Array(8)].map((_, i) => (
                    <Skeleton key= { i } height = { 200} />
                ))}
</div>
        ),
    }
)

// Video player component
export const VideoPlayer = dynamic(
    () => import('@/components/VideoPlayer'),
    {
        loading: () => (
            <div className= "aspect-video bg-gray-900 flex items-center justify-center" >
            <Skeleton height="100%" width = "100%" />
                </div>
        ),
    ssr: false,
    }
)
