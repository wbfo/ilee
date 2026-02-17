import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { logisticsFormSchema } from '@/lib/schemas';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate data
    const result = logisticsFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    console.log('Logistics Inquiry Received:', data);

    if (resend) {
      try {
        await resend.emails.send({
          from: 'iLee LLC <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          subject: `New Logistics Inquiry: ${data.serviceType} (${data.name})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Logistics/Transport Inquiry</h2>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top: 0;">Contact</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Name:</strong> ${data.name}</li>
                  <li><strong>Phone:</strong> ${data.phone}</li>
                  <li><strong>Email:</strong> ${data.email}</li>
                </ul>
              </div>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top: 0;">Service Details</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Type:</strong> ${data.serviceType}</li>
                  <li><strong>Pickup:</strong> ${data.pickupAddress || 'N/A'}</li>
                  <li><strong>Dropoff:</strong> ${data.dropoffAddress || 'N/A'}</li>
                </ul>
                <h4>Notes/Description:</h4>
                <p style="white-space: pre-wrap;">${data.notes}</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received' });
  } catch (error) {
    console.error('Logistics API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
