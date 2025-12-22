import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Verify code
    const { data, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    // Mark as used
    await supabase
      .from('verification_codes')
      .update({ used: true })
      .eq('id', data.id);

    return NextResponse.json({ message: 'Email verified successfully', verified: true });
  } catch (error) {
    console.error('Error in verify-code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
