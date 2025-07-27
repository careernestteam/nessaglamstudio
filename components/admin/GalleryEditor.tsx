'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Upload, Edit, Trash2, GripVertical, Save, X, Image as ImageIcon } from 'lucide-react'
import { ReactSortable } from 'react-sortablejs'
import toast from 'react-hot-toast'

interface GalleryImage {
  id: string
  url: string
  alt: string
  category: string
  title: string
  order_index: number
  is_active: boolean
}

const categories = [
  'Bridal Makeup',
  'Hair Installation', 
  'Glam Makeup',
  'Natural Look',
  'Special Events'
]

export default function GalleryEditor() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index')

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      toast.error('Failed to load gallery images')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateImageOrder = async (newImages: GalleryImage[]) => {
    try {
      const updates = newImages.map((image, index) => ({
        id: image.id,
        order_index: index + 1
      }))

      const { error } = await supabase
        .from('gallery_images')
        .upsert(updates)

      if (error) throw error
      
      setImages(newImages)
      toast.success('Image order updated')
    } catch (error) {
      toast.error('Failed to update image order')
      console.error('Error:', error)
    }
  }

  const saveImage = async (imageData: Partial<GalleryImage>) => {
    try {
      if (editingImage) {
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update({
            ...imageData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingImage.id)

        if (error) throw error
        toast.success('Image updated successfully')
      } else {
        // Create new image
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            ...imageData,
            order_index: images.length + 1,
            is_active: true
          })

        if (error) throw error
        toast.success('Image added successfully')
      }

      setEditingImage(null)
      setShowAddForm(false)
      loadImages()
    } catch (error) {
      toast.error('Failed to save image')
      console.error('Error:', error)
    }
  }

  const deleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId)

      if (error) throw error
      
      toast.success('Image deleted successfully')
      loadImages()
    } catch (error) {
      toast.error('Failed to delete image')
      console.error('Error:', error)
    }
  }

  const toggleImageStatus = async (imageId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_active: !isActive })
        .eq('id', imageId)

      if (error) throw error
      
      toast.success(`Image ${!isActive ? 'activated' : 'deactivated'}`)
      loadImages()
    } catch (error) {
      toast.error('Failed to update image status')
      console.error('Error:', error)
    }
  }

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gallery Management</h3>
            <p className="text-sm text-gray-600">Manage your portfolio images and categories</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Upload size={16} />
            Add Image
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({images.length})
          </button>
          {categories.map(category => {
            const count = images.filter(img => img.category === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Gallery Images</h4>
          <p className="text-sm text-gray-600">Drag to reorder images</p>
        </div>

        {filteredImages.length > 0 ? (
          <ReactSortable
            list={filteredImages}
            setList={updateImageOrder}
            handle=".drag-handle"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          >
            {filteredImages.map((image) => (
              <div key={image.id} className="group relative bg-gray-50 rounded-lg overflow-hidden">
                <div className="drag-handle absolute top-2 left-2 z-10 cursor-move bg-white/80 backdrop-blur-sm p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={16} className="text-gray-600" />
                </div>

                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900 truncate">{image.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      image.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {image.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-purple-600 mb-2">{image.category}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{image.alt}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleImageStatus(image.id, image.is_active)}
                      className={`flex-1 px-3 py-1 text-xs rounded transition-colors ${
                        image.is_active
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {image.is_active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => setEditingImage(image)}
                      className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ReactSortable>
        ) : (
          <div className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {selectedCategory === 'All' 
                ? 'No images found. Add your first image to get started.'
                : `No images found in ${selectedCategory} category.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Image Modal */}
      {(showAddForm || editingImage) && (
        <ImageForm
          image={editingImage}
          onSave={saveImage}
          onCancel={() => {
            setShowAddForm(false)
            setEditingImage(null)
          }}
        />
      )}
    </div>
  )
}

function ImageForm({ 
  image, 
  onSave, 
  onCancel 
}: { 
  image: GalleryImage | null
  onSave: (data: Partial<GalleryImage>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    url: image?.url || '',
    alt: image?.alt || '',
    category: image?.category || categories[0],
    title: image?.title || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {image ? 'Edit Image' : 'Add New Image'}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use high-quality images from Pexels or other stock photo sites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Elegant Bridal Look"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text (SEO Description)
            </label>
            <textarea
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Professional bridal makeup transformation - Nessa Glam Studio Johannesburg"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Describe the image for SEO and accessibility
            </p>
          </div>

          {/* Image Preview */}
          {formData.url && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

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
              {image ? 'Update Image' : 'Add Image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}