import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface DashboardStats {
  events: number
  merch: number
  users: number
  revenue: number
}

interface DashboardState {
  stats: DashboardStats
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  stats: {
    events: 0,
    merch: 0,
    users: 0,
    revenue: 0
  },
  loading: false,
  error: null,
}

export const fetchDashboardStats = createAsyncThunk('dashboard/fetchStats', async () => {
  const response = await fetch('/api/dashboard/stats')
  if (!response.ok) throw new Error('Failed to fetch dashboard stats')
  return response.json()
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch stats'
      })
  },
})

export default dashboardSlice.reducer
