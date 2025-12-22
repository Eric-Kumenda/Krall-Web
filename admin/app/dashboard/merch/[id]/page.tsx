'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProductById, updateProduct } from '@/store/slices/merchSlice'

export default function EditMerchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock_quantity: 0,
    is_active: true,
    image_url: ''
  })

  // We can select from store if we want, but we also fetch to ensure fresh data
  const { items } = useAppSelector((state) => state.merch)

  useEffect(() => {
    dispatch(fetchProductById(id))
      .unwrap()
      .then((data) => {
        setFormData({
          name: data.name,
          description: data.description || '',
          price: data.price,
          category: data.category || '',
          stock_quantity: data.stock_quantity,
          is_active: data.is_active,
          image_url: data.image_url
        })
        setImagePreview(data.image_url)
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err)
        alert('Failed to load product details')
        router.push('/dashboard/merch')
      })
  }, [dispatch, id, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('price', formData.price.toString())
      data.append('category', formData.category)
      data.append('stock_quantity', formData.stock_quantity.toString())
      data.append('is_active', formData.is_active.toString())
      // Pass existing image_url so backend knows to keep it if no new image
      if (formData.image_url) {
        data.append('image_url', formData.image_url)
      }

      if (imageFile) {
        data.append('image', imageFile)
      }

      await dispatch(updateProduct({ id, data })).unwrap()

      router.push('/dashboard/merch')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/merch" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold font-montserrat text-white">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Krall Hoodie"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Product details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Art">Art</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Image */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Product Image</h3>
              <div className="relative aspect-square w-full bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-primary transition-colors group">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized={true} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload size={32} className="mb-2" />
                    <span className="text-sm">Click to upload</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Inventory & Pricing</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price (KES)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              <div className="pt-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white font-medium">Active Product</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
