import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('merch')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
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
    const productData: any = {}
    
    if (formData.has('name')) productData.name = formData.get('name')
    if (formData.has('description')) productData.description = formData.get('description')
    if (formData.has('price')) productData.price = Number(formData.get('price'))
    if (formData.has('category')) productData.category = formData.get('category')
    if (formData.has('stock_quantity')) productData.stock_quantity = Number(formData.get('stock_quantity'))
    if (formData.has('is_active')) productData.is_active = formData.get('is_active') === 'true'
    
    if (image_url) {
      productData.image_url = image_url
    }

    const { data, error } = await supabase
      .from('merch')
      .update(productData)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { error } = await supabase
    .from('merch')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
