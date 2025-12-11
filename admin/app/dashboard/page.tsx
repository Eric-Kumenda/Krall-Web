'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Calendar, ShoppingBag, Users, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    events: 0,
    merch: 0,
    users: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch counts from Supabase
      // Note: This requires the tables to exist and have data. 
      // For now we will just fetch counts if tables exist, or default to 0.
      
      const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true })
      const { count: merchCount } = await supabase.from('merch').select('*', { count: 'exact', head: true })
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      
      // Revenue would typically come from an orders table
      // const { data: orders } = await supabase.from('orders').select('total_amount')
      // const revenue = orders?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0

      setStats({
        events: eventsCount || 0,
        merch: merchCount || 0,
        users: usersCount || 0,
        revenue: 0 // Placeholder
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: 'Total Events', value: stats.events, icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Merch Items', value: stats.merch, icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Total Revenue', value: `KES ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back to The Krall Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {loading ? '...' : stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity or Charts could go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl min-h-[300px]">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center h-full text-gray-500">
            Activity feed coming soon...
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl min-h-[300px]">
           <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
           <div className="grid grid-cols-2 gap-4">
             <button className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-left border border-gray-700">
               <Calendar className="mb-2 text-primary" />
               <span className="font-bold block">Create Event</span>
               <span className="text-xs text-gray-400">Add a new event</span>
             </button>
             <button className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-left border border-gray-700">
               <ShoppingBag className="mb-2 text-purple-400" />
               <span className="font-bold block">Add Merch</span>
               <span className="text-xs text-gray-400">New product</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  )
}
