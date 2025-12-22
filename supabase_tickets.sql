-- Create ticket_types table
CREATE TABLE IF NOT EXISTS ticket_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create verification_codes table
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  mpesa_checkout_request_id TEXT,
  attendee_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  ticket_type_id UUID REFERENCES ticket_types(id),
  name TEXT NOT NULL,
  ticket_code TEXT UNIQUE NOT NULL,
  checked_in BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

-- Create policies (Adjust as needed for your auth model)
-- Public read access for ticket types
CREATE POLICY "Public read access for ticket types" ON ticket_types FOR SELECT USING (true);

-- Registrations: Users can see their own (by email matching auth or session - simplified here for public creation)
CREATE POLICY "Public create registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read registrations" ON registrations FOR SELECT USING (true); -- CAUTION: Restrict this in production

-- Attendees: Public create (via registration), Read own
CREATE POLICY "Public create attendees" ON attendees FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read attendees" ON attendees FOR SELECT USING (true); -- CAUTION: Restrict this

-- Verification codes: Public create/read (for the flow)
CREATE POLICY "Public create verification_codes" ON verification_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read verification_codes" ON verification_codes FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_ticket_types_event_id ON ticket_types(event_id);
CREATE INDEX idx_verification_codes_email ON verification_codes(email);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_attendees_registration_id ON attendees(registration_id);
CREATE INDEX idx_attendees_ticket_code ON attendees(ticket_code);
