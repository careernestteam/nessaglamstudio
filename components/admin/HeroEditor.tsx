'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Save, RefreshCw, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().min(1, 'Description is required'),
  ctaText: z.string().min(1, 'CTA text is required'),
  ctaSecondaryText: z.string().min(1, 'Secondary CTA text is required'),
})

type HeroFormData = z.infer<typeof heroSchema>

export default function HeroEditor() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const supabase = createClientSupabaseClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: 'Transform Your Beauty',
      subtitle: 'with Nessa Glam Studio',
      description: "Johannesburg's premier destination for professional hair installation and makeup artistry. Experience luxury beauty services that enhance your natural radiance and boost your confidence.",
      ctaText: 'Book Now on WhatsApp',
      ctaSecondaryText: 'View Our Transformations'
    }
  })

  useEffect(() => {
    loadHeroContent()
  }, [])

  const loadHeroContent = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'hero')
        .single()

      if (data?.content) {
        reset(data.content)
      }
    } catch (error) {
      console.error('Error loading hero content:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: HeroFormData) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section: 'hero',
          content: data,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('Hero section updated successfully!')
      
      // Trigger revalidation
      await fetch('/api/revalidate?path=/', { method: 'POST' })
    } catch (error) {
      toast.error('Failed to update hero section')
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const previewChanges = () => {
    window.open('/', '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Hero Section Editor</h3>
              <p className="text-sm text-gray-600">Update the main hero section of your website</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={previewChanges}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye size={16} />
                Preview
              </button>
              <button
                onClick={loadHeroContent}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title
              </label>
              <input
                {...register('title')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Transform Your Beauty"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                {...register('subtitle')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="with Nessa Glam Studio"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Johannesburg's premier destination for professional hair installation and makeup artistry..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary CTA Button Text
              </label>
              <input
                {...register('ctaText')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Book Now on WhatsApp"
              />
              {errors.ctaText && (
                <p className="mt-1 text-sm text-red-600">{errors.ctaText.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary CTA Button Text
              </label>
              <input
                {...register('ctaSecondaryText')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="View Our Transformations"
              />
              {errors.ctaSecondaryText && (
                <p className="mt-1 text-sm text-red-600">{errors.ctaSecondaryText.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {isDirty ? 'You have unsaved changes' : 'All changes saved'}
            </div>
            <button
              type="submit"
              disabled={saving || !isDirty}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}