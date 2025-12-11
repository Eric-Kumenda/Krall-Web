import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar_url: string
  role: string
}

interface ProfileState {
  data: Profile | null
  loading: boolean
  error: string | null
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
  updateStatus: 'idle',
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const response = await fetch('/api/profile')
  if (!response.ok) throw new Error('Failed to fetch profile')
  return response.json()
})

export const updateProfile = createAsyncThunk('profile/updateProfile', async (data: Partial<Profile>) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update profile')
  return response.json()
})

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch profile'
      })
      // Update
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded'
        state.data = { ...state.data, ...action.payload }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.error = action.error.message || 'Failed to update profile'
      })
  },
})

export const { resetUpdateStatus } = profileSlice.actions
export default profileSlice.reducer
