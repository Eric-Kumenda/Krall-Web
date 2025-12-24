export const getKrallEmailTemplate = (code: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #111827;
      color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    .logo {
      margin-bottom: 30px;
    }
    .logo img {
      height: 50px;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: 700;
    }
    p {
      color: #9ca3af;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .code {
      background-color: rgba(255, 206, 27, 0.1);
      border: 1px solid #ffce1b;
      color: #ffce1b;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 8px;
      padding: 20px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 30px;
    }
    .footer {
      margin-top: 40px;
      color: #6b7280;
      font-size: 12px;
    }
    .highlight {
      color: #ffce1b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <!-- Replace with actual hosted logo URL if available, or use text -->
        <h2 style="color: white; margin: 0;">KRALL <span class="highlight">KONSULT</span></h2>
      </div>
      
      <h1>Verify Your Email</h1>
      
      <p>
        You are one step away from completing your registration. 
        Use the verification code below to verify your email address.
      </p>
      
      <div class="code">
        ${code}
      </div>
      
      <p>
        This code will expire in 10 minutes. 
        If you didn't request this code, you can safely ignore this email.
      </p>
      
      <div class="footer">
        &copy; ${new Date().getFullYear()} The Krall. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`;

export const getTicketEmailTemplate = (
	eventName: string,
	tickets: { name: string; code: string; qrUrl: string }[]
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tickets - ${eventName}</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #111827;
      color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      backdrop-filter: blur(10px);
      margin-bottom: 20px;
    }
    .ticket {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 20px;
        margin-top: 20px;
    }
    h1 { color: #ffffff; margin-bottom: 10px; }
    h2 { color: #ffce1b; margin: 0 0 20px; }
    p { color: #9ca3af; line-height: 1.6; }
    .qr-code {
        margin: 20px auto;
        background: white;
        padding: 10px;
        border-radius: 8px;
        display: inline-block;
    }
    .qr-code img {
        width: 150px;
        height: 150px;
        display: block;
    }
    .ticket-code {
        font-family: monospace;
        background: #374151;
        padding: 8px 16px;
        border-radius: 6px;
        color: #fff;
        font-size: 1.2em;
        letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2 style="color: white; margin-bottom: 30px;">KRALL <span style="color: #ffce1b;">KONSULT</span></h2>
      <h1>You're Going!</h1>
      <p>Here are your tickets for <strong>${eventName}</strong>.</p>
      
      ${tickets
			.map(
				(t) => `
        <div class="ticket">
            <h3 style="color: white; margin: 0;">${t.name}</h3>
            <div class="qr-code">
                <img src="${t.qrUrl}" alt="QR Code" />
            </div>
            <div class="ticket-code">${t.code}</div>
        </div>
      `
			)
			.join("")}

      <p style="margin-top: 40px;">Please present these QR codes at the entrance.</p>
    </div>
  </div>
</body>
</html>
`;
