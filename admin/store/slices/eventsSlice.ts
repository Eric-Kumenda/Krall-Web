import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url: string
  price: number
  tickets_available: number
  tickets_sold: number
  is_published: boolean
  created_by: string
}

interface EventsState {
  items: Event[]
  loading: boolean
  error: string | null
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch('/api/events')
  if (!response.ok) throw new Error('Failed to fetch events')
  return response.json()
})

export const createEvent = createAsyncThunk('events/createEvent', async (eventData: Partial<Event>) => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  })
  if (!response.ok) throw new Error('Failed to create event')
  return response.json()
})

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, data }: { id: string; data: Partial<Event> }) => {
  const response = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update event')
  return response.json()
})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: string) => {
  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete event')
  return id
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch events'
      })
      // Create
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex((e) => e.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload)
      })
  },
})

export default eventsSlice.reducer
