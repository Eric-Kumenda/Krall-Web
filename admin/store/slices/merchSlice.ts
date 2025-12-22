import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock_quantity: number
  is_active: boolean
  image_url: string
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

export const createProduct = createAsyncThunk('merch/createProduct', async (productData: FormData) => {
  const response = await fetch('/api/merch', {
    method: 'POST',
    body: productData,
  })
  if (!response.ok) throw new Error('Failed to create product')
  return response.json()
})

export const fetchProductById = createAsyncThunk('merch/fetchProductById', async (id: string) => {
  const response = await fetch(`/api/merch/${id}`)
  if (!response.ok) throw new Error('Failed to fetch product')
  return response.json()
})

export const updateProduct = createAsyncThunk('merch/updateProduct', async ({ id, data }: { id: string; data: FormData }) => {
  const response = await fetch(`/api/merch/${id}`, {
    method: 'PUT',
    body: data,
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
      // Fetch Single
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        } else {
          state.items.push(action.payload)
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export default merchSlice.reducer
