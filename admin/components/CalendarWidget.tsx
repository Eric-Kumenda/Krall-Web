'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const renderDays = () => {
    const totalDays = daysInMonth(currentDate)
    const startDay = startDayOfMonth(currentDate)
    const daysArray = []

    // Empty cells for days before start of month
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8 w-8" />)
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const isToday = 
        i === new Date().getDate() && 
        currentDate.getMonth() === new Date().getMonth() && 
        currentDate.getFullYear() === new Date().getFullYear()

      daysArray.push(
        <div 
          key={i} 
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-all
            ${isToday 
              ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(255,206,27,0.4)]' 
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          {i}
        </div>
      )
    }

    return daysArray
  }

  return (
    <div className="p-4 w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white font-montserrat">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <div key={day} className="h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {renderDays()}
      </div>
    </div>
  )
}
