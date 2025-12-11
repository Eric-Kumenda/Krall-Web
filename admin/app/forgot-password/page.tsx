'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/profile`,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the password reset link.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md p-8 glass-card rounded-2xl animate-in fade-in zoom-in duration-500">
        <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Login
        </Link>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 mb-4">
             <Image 
               src="/assets/img/Krall Logo -Primary.svg" 
               alt="Krall Logo" 
               fill
               className="object-contain"
             />
          </div>
          <h1 className="text-2xl font-bold text-white font-montserrat">Reset Password</h1>
          <p className="text-gray-400 mt-2 text-center">Enter your email to receive reset instructions</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="admin@thekrall.com"
              required
            />
          </div>

          {message && (
            <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
              {message}
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
