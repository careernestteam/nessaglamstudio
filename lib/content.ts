import { createServerSupabaseClient } from './supabase'
import { Database } from './supabase'

type SiteContent = Database['public']['Tables']['site_content']['Row']
type Service = Database['public']['Tables']['services']['Row']
type GalleryImage = Database['public']['Tables']['gallery_images']['Row']

export async function getSiteContent(section: string): Promise<any> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section', section)
    .single()

  if (error || !data) {
    return getDefaultContent(section)
  }

  return data.content
}

export async function updateSiteContent(section: string, content: any) {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('site_content')
    .upsert({
      section,
      content,
      updated_at: new Date().toISOString()
    })

  if (error) {
    throw new Error(`Failed to update content: ${error.message}`)
  }
}

export async function getServices(): Promise<Service[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  if (error) {
    return getDefaultServices()
  }

  return data || getDefaultServices()
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  if (error) {
    return getDefaultGalleryImages()
  }

  return data || getDefaultGalleryImages()
}

function getDefaultContent(section: string): any {
  const defaults: Record<string, any> = {
    hero: {
      title: "Transform Your Beauty",
      subtitle: "with Nessa Glam Studio",
      description: "Johannesburg's premier destination for professional hair installation and makeup artistry. Experience luxury beauty services that enhance your natural radiance and boost your confidence.",
      ctaText: "Book Now on WhatsApp",
      ctaSecondaryText: "View Our Transformations"
    },
    about: {
      title: "About Nessa Glam Studio",
      description: "Welcome to Nessa Glam Studio, Johannesburg's premier destination for professional hair installation and makeup artistry. Located in the heart of South Africa's vibrant beauty scene, we specialize in transforming your natural beauty into stunning, confidence-boosting looks.",
      mission: "To empower every client with confidence through exceptional beauty services, making luxury accessible and creating unforgettable transformations in Johannesburg's beauty landscape."
    },
    booking: {
      method: "whatsapp",
      phone: "+27 81 062 5473",
      email: "info@nessaglamstudio.com",
      whatsappNumber: "27810625473"
    }
  }

  return defaults[section] || {}
}

function getDefaultServices(): Service[] {
  return [
    {
      id: '1',
      title: 'Hair Installation',
      description: 'Professional weaves, closures, frontals, and extensions using premium quality hair.',
      features: ['Virgin Hair Installation', 'Closure & Frontal Application', 'Hair Extensions', 'Protective Styling'],
      price: 'From R800',
      duration: '2-4 hours',
      icon: 'Scissors',
      order_index: 1,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Makeup Artistry',
      description: 'Flawless makeup application for all occasions using high-end cosmetic products.',
      features: ['Glam Makeup', 'Natural Look', 'Special Occasions', 'Photography Ready'],
      price: 'From R400',
      duration: '1-2 hours',
      icon: 'Palette',
      order_index: 2,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Bridal Packages',
      description: 'Complete bridal beauty transformation including hair, makeup, and consultation.',
      features: ['Bridal Consultation', 'Trial Session', 'Wedding Day Service', 'Touch-up Kit'],
      price: 'From R2500',
      duration: '4-6 hours',
      icon: 'Crown',
      order_index: 3,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Special Events',
      description: 'Glamorous styling for parties, photoshoots, and special celebrations.',
      features: ['Event Styling', 'Group Bookings', 'Photoshoot Ready', 'Custom Looks'],
      price: 'From R600',
      duration: '2-3 hours',
      icon: 'Sparkles',
      order_index: 4,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ]
}

function getDefaultGalleryImages(): GalleryImage[] {
  return [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Professional bridal makeup transformation - Nessa Glam Studio Johannesburg',
      category: 'Bridal Makeup',
      title: 'Elegant Bridal Look',
      order_index: 1,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Hair installation weave service - Professional hair stylist Johannesburg',
      category: 'Hair Installation',
      title: 'Luxury Hair Weave',
      order_index: 2,
      is_active: true,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ]
}