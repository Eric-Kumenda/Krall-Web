import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  avatar_url: string
}

interface UsersState {
  items: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

export default usersSlice.reducer
