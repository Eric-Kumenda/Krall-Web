import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in DB
    const { error } = await supabase
      .from('verification_codes')
      .insert({ email, code, expires_at: expiresAt.toISOString() });

    if (error) {
      console.error('Error storing code:', error);
      return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
    }

    // Send Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      const { Resend } = require('resend');
      const resend = new Resend(resendApiKey);
      const { getKrallEmailTemplate } = require('@/utils/email-template');

      await resend.emails.send({
        from: 'The Krall <onboarding@resend.dev>', // Use verified domain in prod
        to: email,
        subject: 'Your Verification Code - The Krall',
        html: getKrallEmailTemplate(code),
      });
      
      console.log(`[RESEND] Email sent to ${email}`);
    } else {
      console.log(`[MOCK EMAIL] Verification code for ${email}: ${code}`);
      console.warn('RESEND_API_KEY not found in environment variables');
    }

    return NextResponse.json({ message: 'Verification code sent' });
  } catch (error) {
    console.error('Error in send-code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
