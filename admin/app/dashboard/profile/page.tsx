'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User, Camera, Loader2, Save } from 'lucide-react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProfile, updateProfile, resetUpdateStatus } from '@/store/slices/profileSlice'

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { data: profile, loading, updateStatus, error } = useAppSelector((state) => state.profile)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        email: profile.email || ''
      })
    }
  }, [profile])

  useEffect(() => {
    if (updateStatus === 'succeeded') {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      dispatch(resetUpdateStatus())
    } else if (updateStatus === 'failed') {
      setMessage({ type: 'error', text: error || 'Failed to update profile' })
      dispatch(resetUpdateStatus())
    }
  }, [updateStatus, error, dispatch])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      let avatar_url = profile?.avatar_url

      // Upload avatar if changed
      if (avatarFile) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${user.id}-${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile)

        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName)
          
        avatar_url = publicUrl
      }

      dispatch(updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        avatar_url
      }))

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold font-montserrat text-white mb-8">My Profile</h1>

      <div className="glass-card p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 group-hover:border-primary transition-colors">
                {avatarPreview || profile?.avatar_url ? (
                  <Image 
                    src={avatarPreview || profile?.avatar_url || ''} 
                    alt="Avatar" 
                    width={128} 
                    height={128} 
                    className="object-cover w-full h-full"
                    unoptimized={true}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <User size={48} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-primary text-black rounded-full cursor-pointer hover:bg-yellow-400 transition-colors shadow-lg">
                <Camera size={18} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">{formData.first_name} {formData.last_name}</h3>
              <p className="text-gray-400">{formData.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Allowed formats: JPG, PNG. Max size: 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Doe"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="+254 700 000 000"
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm text-center ${
              message.type === 'success' ? 'bg-green-500/20 text-green-200 border border-green-500/50' : 'bg-red-500/20 text-red-200 border border-red-500/50'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={updateStatus === 'loading'}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {updateStatus === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
