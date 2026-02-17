import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/schemas';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate data
        const result = contactFormSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid form data', details: result.error.flatten() },
                { status: 400 }
            );
        }

        const data = result.data;

        console.log('Contact Message Received:', data);

        if (resend) {
            try {
                await resend.emails.send({
                    from: 'iLee LLC <onboarding@resend.dev>',
                    to: ADMIN_EMAIL,
                    subject: `New Message from ${data.name}`,
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Contact Form Submission</h2>
              
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
          `,
                });
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
