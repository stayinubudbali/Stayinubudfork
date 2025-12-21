import { createClient } from '@/lib/supabase/server'
import FooterClient from './FooterClient'

export default async function Footer() {
    const supabase = await createClient()

    // Fetch site settings
    const { data: settings } = await supabase
        .from('site_settings')
        .select('key, value')

    // Transform settings array to object
    const siteSettings: any = {
        contact: { phone: '+62 812 3456 7890', email: 'hello@stayinubud.com', whatsapp: '6281234567890', address: 'Ubud, Bali, Indonesia' },
        social: { instagram: '', facebook: '', tiktok: '', youtube: '' },
        footer: { copyright: '© 2024 StayinUBUD. All rights reserved.', show_newsletter: true }
    }

    if (settings) {
        settings.forEach((row) => {
            if (row.key in siteSettings) {
                siteSettings[row.key] = row.value
            }
        })
    }

    return <FooterClient settings={siteSettings} />
}
