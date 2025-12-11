'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, ShoppingBag, Tag, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts, deleteProduct } from '@/store/slices/merchSlice'

export default function MerchPage() {
  const dispatch = useAppDispatch()
  const { items: products, loading } = useAppSelector((state) => state.merch)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    dispatch(deleteProduct(id))
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-white">Merchandise</h1>
          <p className="text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <Link 
          href="/dashboard/merch/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
        <Search className="text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full"
        />
      </div>

      {/* Products Grid */}
      {loading && products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl">
          <p className="text-gray-400 mb-4">No products found</p>
          <Link href="/dashboard/merch/new" className="text-primary hover:underline">Add your first product</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors flex flex-col">
              {/* Image */}
              <div className="relative h-48 bg-gray-800">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    <ShoppingBag size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                  {product.category || 'Uncategorized'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 truncate">{product.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Price</span>
                    <span className="text-lg font-bold text-primary">KES {product.price}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Stock</span>
                    <span className="text-sm font-medium text-white flex items-center gap-1">
                      <Package size={14} /> {product.stock_quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-900/50 flex items-center justify-between gap-2">
                <Link 
                  href={`/dashboard/merch/${product.id}`}
                  className="flex-1 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-center text-sm font-medium text-white transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
