import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('merch')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()
    
    const image = formData.get('image') as File | null
    let image_url = formData.get('image_url') as string || ''

    // Upload image if present
    if (image) {
      const fileExt = image.name.split('.').pop()
      const fileName = `merch-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('merch-images')
        .upload(fileName, image)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('merch-images')
        .getPublicUrl(fileName)
      
      image_url = publicUrl
    }

    // Construct product data
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      stock_quantity: Number(formData.get('stock_quantity')),
      is_active: formData.get('is_active') === 'true',
      image_url
    }
    
    const { data, error } = await supabase
      .from('merch')
      .insert(productData)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
