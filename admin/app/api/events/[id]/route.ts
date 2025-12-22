import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      speakers:event_speakers(*),
      sponsors:event_sponsors(*),
      tickets:event_tickets(*)
    `)
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
      const fileName = `event-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, image)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName)
      
      image_url = publicUrl
    }

    // Construct event data
    const eventData: any = {}
    
    if (formData.has('title')) eventData.title = formData.get('title')
    if (formData.has('description')) eventData.description = formData.get('description')
    if (formData.has('date')) eventData.date = formData.get('date')
    if (formData.has('location')) eventData.location = formData.get('location')
    if (formData.has('price')) eventData.price = Number(formData.get('price'))
    if (formData.has('tickets_available')) eventData.tickets_available = Number(formData.get('tickets_available'))
    if (formData.has('is_published')) eventData.is_published = formData.get('is_published') === 'true'
    
    // New columns
    if (formData.has('category')) eventData.category = formData.get('category')
    if (formData.has('venue')) eventData.venue = formData.get('venue')
    if (formData.has('phone')) eventData.phone = formData.get('phone')
    if (formData.has('email')) eventData.email = formData.get('email')
    
    // JSON columns - accept as stringified JSON
    if (formData.has('what_to_expect')) {
      try {
        eventData.what_to_expect = JSON.parse(formData.get('what_to_expect') as string)
      } catch (e) {
        console.error('Invalid JSON for what_to_expect')
      }
    }

    if (image_url) {
      eventData.image_url = image_url
    } else if (formData.has('image_url')) {
        const passedUrl = formData.get('image_url') as string
        if (passedUrl) eventData.image_url = passedUrl
    }

    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
