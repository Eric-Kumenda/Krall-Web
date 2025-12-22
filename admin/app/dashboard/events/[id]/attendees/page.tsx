'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAttendees } from '@/store/slices/attendeesSlice'
import { Loader2, User, Mail, Ticket, CheckCircle, XCircle } from 'lucide-react'

export default function AttendeesPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const eventId = params.id as string
  const { items: attendees, loading } = useAppSelector((state) => state.attendees)

  useEffect(() => {
    if (eventId) {
      dispatch(fetchAttendees(eventId))
    }
  }, [dispatch, eventId])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-white">Attendees</h1>
        <p className="text-gray-400 mt-1">Manage registered attendees for this event</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : attendees.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl">
          <p className="text-gray-400">No attendees found for this event.</p>
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Ticket Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Check-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          <User size={16} />
                        </div>
                        <span className="font-medium text-white">{attendee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-500" />
                        {attendee.registrations?.user_email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ticket size={14} className="text-gray-500" />
                        <span className="text-white">{attendee.ticket_types?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        attendee.registrations?.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {attendee.registrations?.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {attendee.checked_in ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <CheckCircle size={16} /> Checked In
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <XCircle size={16} /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
