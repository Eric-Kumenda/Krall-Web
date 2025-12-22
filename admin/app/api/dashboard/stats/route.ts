import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const [
      { count: eventsCount },
      { count: merchCount },
      { count: usersCount }
    ] = await Promise.all([
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('merch').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true })
    ]);

    // Revenue placeholder (implement real logic when orders table exists)
    const revenue = 0;

    return NextResponse.json({
      events: eventsCount || 0,
      merch: merchCount || 0,
      users: usersCount || 0,
      revenue
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
