'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Plus, Edit, Trash2, GripVertical, Save, X } from 'lucide-react'
import { ReactSortable } from 'react-sortablejs'
import toast from 'react-hot-toast'

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  duration: string
  icon: string
  order_index: number
  is_active: boolean
}

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index')

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      toast.error('Failed to load services')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateServiceOrder = async (newServices: Service[]) => {
    try {
      const updates = newServices.map((service, index) => ({
        id: service.id,
        order_index: index + 1
      }))

      const { error } = await supabase
        .from('services')
        .upsert(updates)

      if (error) throw error
      
      setServices(newServices)
      toast.success('Service order updated')
    } catch (error) {
      toast.error('Failed to update service order')
      console.error('Error:', error)
    }
  }

  const saveService = async (serviceData: Partial<Service>) => {
    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({
            ...serviceData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingService.id)

        if (error) throw error
        toast.success('Service updated successfully')
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert({
            ...serviceData,
            order_index: services.length + 1,
            is_active: true
          })

        if (error) throw error
        toast.success('Service created successfully')
      }

      setEditingService(null)
      setShowAddForm(false)
      loadServices()
    } catch (error) {
      toast.error('Failed to save service')
      console.error('Error:', error)
    }
  }

  const deleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)

      if (error) throw error
      
      toast.success('Service deleted successfully')
      loadServices()
    } catch (error) {
      toast.error('Failed to delete service')
      console.error('Error:', error)
    }
  }

  const toggleServiceStatus = async (serviceId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !isActive })
        .eq('id', serviceId)

      if (error) throw error
      
      toast.success(`Service ${!isActive ? 'activated' : 'deactivated'}`)
      loadServices()
    } catch (error) {
      toast.error('Failed to update service status')
      console.error('Error:', error)
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Services Management</h3>
            <p className="text-sm text-gray-600">Manage your beauty services, pricing, and descriptions</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Current Services</h4>
          <p className="text-sm text-gray-600">Drag to reorder services</p>
        </div>

        <ReactSortable
          list={services}
          setList={updateServiceOrder}
          handle=".drag-handle"
          className="divide-y divide-gray-200"
        >
          {services.map((service) => (
            <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="drag-handle cursor-move text-gray-400 hover:text-gray-600">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-gray-900">{service.title}</h5>
                    <span className="text-sm font-medium text-purple-600">{service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleServiceStatus(service.id, service.is_active)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      service.is_active
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {service.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>

        {services.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No services found. Add your first service to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Service Modal */}
      {(showAddForm || editingService) && (
        <ServiceForm
          service={editingService}
          onSave={saveService}
          onCancel={() => {
            setShowAddForm(false)
            setEditingService(null)
          }}
        />
      )}
    </div>
  )
}

function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: Service | null
  onSave: (data: Partial<Service>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    features: service?.features || [''],
    price: service?.price || '',
    duration: service?.duration || '',
    icon: service?.icon || 'Scissors'
  })

  const iconOptions = [
    'Scissors', 'Palette', 'Crown', 'Sparkles', 'Heart', 'Star'
  ]

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanFeatures = formData.features.filter(f => f.trim() !== '')
    onSave({
      ...formData,
      features: cleanFeatures
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {service ? 'Edit Service' : 'Add New Service'}
            </h3>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="From R800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="2-4 hours"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter feature"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Save size={16} />
              {service ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}