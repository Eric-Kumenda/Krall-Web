import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
  is_active: boolean
}

interface MerchState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: MerchState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk('merch/fetchProducts', async () => {
  const response = await fetch('/api/merch')
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
})

export const createProduct = createAsyncThunk('merch/createProduct', async (productData: Partial<Product>) => {
  const response = await fetch('/api/merch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
  if (!response.ok) throw new Error('Failed to create product')
  return response.json()
})

export const updateProduct = createAsyncThunk('merch/updateProduct', async ({ id, data }: { id: string; data: Partial<Product> }) => {
  const response = await fetch(`/api/merch/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update product')
  return response.json()
})

export const deleteProduct = createAsyncThunk('merch/deleteProduct', async (id: string) => {
  const response = await fetch(`/api/merch/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete product')
  return id
})

const merchSlice = createSlice({
  name: 'merch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
  },
})

export default merchSlice.reducer
