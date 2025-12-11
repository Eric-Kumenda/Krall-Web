'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload, Calendar as CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch } from '@/store/hooks'
import { createEvent } from '@/store/slices/eventsSlice'

export default function NewEventPage() {
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    tickets_available: 100,
    is_published: false
  })

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
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let image_url = ''

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `event-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(fileName)
        
        image_url = publicUrl
      }

      await dispatch(createEvent({
        ...formData,
        image_url,
        created_by: user.id
      })).unwrap()

      router.push('/dashboard/events')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/events" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold font-montserrat text-white">Create New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Summer Music Festival"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Describe your event..."
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Date & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. The Krall Arena"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Image */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Event Image</h3>
              <div className="relative aspect-video w-full bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-primary transition-colors group">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
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
              <h3 className="text-lg font-bold text-white mb-4">Ticketing</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price (KES)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Tickets</label>
                <input
                  type="number"
                  min="1"
                  value={formData.tickets_available}
                  onChange={(e) => setFormData({ ...formData, tickets_available: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white font-medium">Publish Event</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
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
            Save Event
          </button>
        </div>
      </form>
    </div>
  )
}
