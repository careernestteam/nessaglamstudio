import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

export const createClientSupabaseClient = () => {
  return createClientComponentClient()
}

export type Database = {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string
          section: string
          content: any
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          section: string
          content: any
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          section?: string
          content?: any
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          features: string[]
          price: string
          duration: string
          icon: string
          order_index: number
          is_active: boolean
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          features: string[]
          price: string
          duration: string
          icon: string
          order_index: number
          is_active?: boolean
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          features?: string[]
          price?: string
          duration?: string
          icon?: string
          order_index?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          url: string
          alt: string
          category: string
          title: string
          order_index: number
          is_active: boolean
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          alt: string
          category: string
          title: string
          order_index: number
          is_active?: boolean
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string
          category?: string
          title?: string
          order_index?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      admin_analytics: {
        Row: {
          id: string
          event_type: string
          event_data: any
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          event_data: any
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          event_data?: any
        }
      }
    }
  }
}