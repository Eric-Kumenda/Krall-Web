import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "Results contain 0 rows"
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If no profile exists, return basic user info
  if (!data) {
    return NextResponse.json({
      id: user.id,
      email: user.email,
      first_name: '',
      last_name: '',
      phone: '',
      avatar_url: '',
      role: 'User'
    })
  }

  return NextResponse.json({ ...data, email: user.email })
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  
  // Ensure we only update the authenticated user's profile
  const updates = {
    ...body,
    id: user.id,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(updates)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
