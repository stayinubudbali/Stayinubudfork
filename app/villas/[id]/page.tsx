import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VillaDetails from '@/components/villas/VillaDetails'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import { Metadata } from 'next'

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const supabase = await createClient()

    const { data: villa } = await supabase
        .from('villas')
        .select('name, description')
        .eq('id', id)
        .single()

    if (!villa) {
        return {
            title: 'Villa Not Found - StayinUBUD',
        }
    }

    return {
        title: `${villa.name} - StayinUBUD`,
        description: villa.description?.substring(0, 160),
    }
}

export default async function VillaPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    const { data: villa, error } = await supabase
        .from('villas')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !villa) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <div className="pt-[90px] lg:pt-[100px] pb-20">
                <VillaDetails villa={villa} />
            </div>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
