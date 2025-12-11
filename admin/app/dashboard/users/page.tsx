'use client'

import { useEffect, useState } from 'react'
import { Search, User, Shield, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUsers } from '@/store/slices/usersSlice'

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { items: users, loading } = useAppSelector((state) => state.users)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const filteredUsers = users.filter(user => 
    (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-white">Users</h1>
        <p className="text-gray-400 mt-1">Manage system users and roles</p>
      </div>

      {/* Search */}
      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
        <Search className="text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full"
        />
      </div>

      {/* Users List */}
      {loading && users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl">
          <p className="text-gray-400">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt={user.first_name} width={64} height={64} className="object-cover w-full h-full" unoptimized={true} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <User size={24} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate">
                  {user.first_name} {user.last_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role || 'User'}
                  </span>
                </div>
                
                <div className="mt-3 space-y-1 text-sm text-gray-400">
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {user.phone}
                    </div>
                  )}
                  {/* Email would typically come from auth.users, assuming it's synced or available */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
