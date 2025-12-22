import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Attendee {
  id: string
  name: string
  ticket_code: string
  checked_in: boolean
  registrations: {
    user_email: string
    status: string
    total_amount: number
  }
  ticket_types: {
    name: string
    price: number
  }
}

interface AttendeesState {
  items: Attendee[]
  loading: boolean
  error: string | null
}

const initialState: AttendeesState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchAttendees = createAsyncThunk('attendees/fetchAttendees', async (eventId: string) => {
  const response = await fetch(`/api/events/${eventId}/attendees`)
  if (!response.ok) throw new Error('Failed to fetch attendees')
  return response.json()
})

const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendees.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAttendees.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAttendees.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch attendees'
      })
  },
})

export default attendeesSlice.reducer
