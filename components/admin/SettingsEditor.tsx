'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Save, MessageCircle, Phone, Mail, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

const settingsSchema = z.object({
  method: z.enum(['whatsapp', 'phone', 'email']),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  whatsappNumber: z.string().min(1, 'WhatsApp number is required'),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsEditor() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const supabase = createClientSupabaseClient()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      method: 'whatsapp',
      phone: '+27 81 062 5473',
      email: 'info@nessaglamstudio.com',
      whatsappNumber: '27810625473'
    }
  })

  const selectedMethod = watch('method')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'booking')
        .single()

      if (data?.content) {
        reset(data.content)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SettingsFormData) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section: 'booking',
          content: data,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('Settings updated successfully!')
      
      // Trigger revalidation
      await fetch('/api/revalidate?path=/', { method: 'POST' })
    } catch (error) {
      toast.error('Failed to update settings')
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const testBookingMethod = () => {
    const formData = watch()
    
    switch (formData.method) {
      case 'whatsapp':
        window.open(`https://wa.me/${formData.whatsappNumber}?text=Test message from admin panel`, '_blank')
        break
      case 'phone':
        window.open(`tel:${formData.phone}`, '_blank')
        break
      case 'email':
        window.open(`mailto:${formData.email}?subject=Test from admin panel`, '_blank')
        break
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Booking Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Booking Settings</h3>
              <p className="text-sm text-gray-600">Configure how customers can book your services</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={testBookingMethod}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
              >
                Test Method
              </button>
              <button
                onClick={loadSettings}
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
          {/* Booking Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Primary Booking Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'whatsapp' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  {...register('method')}
                  type="radio"
                  value="whatsapp"
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === 'whatsapp' ? 'bg-green-500' : 'bg-gray-100'
                  }`}>
                    <MessageCircle className={`w-5 h-5 ${
                      selectedMethod === 'whatsapp' ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-sm text-gray-500">Instant messaging</div>
                  </div>
                </div>
                {selectedMethod === 'whatsapp' && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>

              <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'phone' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  {...register('method')}
                  type="radio"
                  value="phone"
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === 'phone' ? 'bg-blue-500' : 'bg-gray-100'
                  }`}>
                    <Phone className={`w-5 h-5 ${
                      selectedMethod === 'phone' ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone Call</div>
                    <div className="text-sm text-gray-500">Direct calling</div>
                  </div>
                </div>
                {selectedMethod === 'phone' && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>

              <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'email' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  {...register('method')}
                  type="radio"
                  value="email"
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === 'email' ? 'bg-purple-500' : 'bg-gray-100'
                  }`}>
                    <Mail className={`w-5 h-5 ${
                      selectedMethod === 'email' ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-500">Email inquiry</div>
                  </div>
                </div>
                {selectedMethod === 'email' && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                {...register('phone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="+27 81 062 5473"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="info@nessaglamstudio.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number (without + or spaces)
            </label>
            <input
              {...register('whatsappNumber')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="27810625473"
            />
            {errors.whatsappNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Format: Country code + number (e.g., 27810625473 for South Africa)
            </p>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
            <p className="text-sm text-gray-600 mb-3">
              When customers click "Book Now", they will be directed to:
            </p>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              {selectedMethod === 'whatsapp' && (
                <div className="flex items-center gap-2 text-green-600">
                  <MessageCircle size={16} />
                  <span className="text-sm">WhatsApp: {watch('whatsappNumber')}</span>
                </div>
              )}
              {selectedMethod === 'phone' && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Phone size={16} />
                  <span className="text-sm">Phone: {watch('phone')}</span>
                </div>
              )}
              {selectedMethod === 'email' && (
                <div className="flex items-center gap-2 text-purple-600">
                  <Mail size={16} />
                  <span className="text-sm">Email: {watch('email')}</span>
                </div>
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
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Additional Settings</h3>
          <p className="text-sm text-gray-600">Other configuration options</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
                <p className="text-sm text-gray-600">Track user interactions and page views</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications for new bookings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}