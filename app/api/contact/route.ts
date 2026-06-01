import { NextResponse } from 'next/server';

const recipientEmail = 'parvag2305@gmail.com';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function clean(value: unknown) {
  return isString(value) ? value.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

  if (!apiKey) {
    return NextResponse.json(
      { message: 'Email service is not configured yet.' },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const name = clean(body.name);
    const email = clean(body.email);
    const subject = clean(body.subject);
    const message = clean(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Please fill in all fields.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientEmail,
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Could not send the message right now.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while sending the message.' },
      { status: 500 },
    );
  }
}
