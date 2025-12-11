'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { User, Bell, MessageSquare, Calendar } from 'lucide-react'
import CalendarWidget from './CalendarWidget'

export default function Topbar() {
  const [user, setUser] = useState<any>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
    getUser()

    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 glass sticky top-0 z-30 flex items-center justify-end px-6 md:px-8 lg:mr-4 rounded-b-2xl mb-6 border-t-0">
      <div className="flex items-center gap-4">
        {/* Calendar */}
        <div className="relative" ref={calendarRef}>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className={`p-2 rounded-xl transition-all duration-200 ${showCalendar ? 'bg-primary text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            title="Calendar"
          >
            <Calendar size={20} />
          </button>
          
          {showCalendar && (
            <div className="absolute top-full right-0 mt-4 glass-card rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <CalendarWidget />
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors relative">
          <MessageSquare size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    </header>
  )
}
