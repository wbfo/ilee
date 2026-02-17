import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkoutSchema } from '@/lib/schemas';
import { siteConfig } from '@/lib/siteConfig';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = siteConfig.contact.email;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, subtotal, expressFee, total, ...formData } = body;

    // Validate Form Data
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      console.error("Validation Error", result.error);
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    // Log for debugging
    console.log('Order Received:', { orderId, items, ...data, total });

    // Send email
    if (resend) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const itemsHtml = items.map((item: any) => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        const emailContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Water Delivery Order #${orderId}</h2>
            <p>You have received a new order request.</p>
            
            ${data.deliverySpeed === 'Express' ? `
              <div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 12px; margin-bottom: 20px;">
                <strong style="color: #1e40af;">⚡ PRIORITY EXPRESS ORDER</strong>
                <p style="margin: 4px 0; color: #1e40af;">Within 48 hours (prioritized) — Additional $75 fee</p>
              </div>
            ` : ''}
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="text-align: left;">
                        <th style="padding: 8px; border-bottom: 2px solid #ddd;">Item</th>
                        <th style="padding: 8px; border-bottom: 2px solid #ddd;">Qty</th>
                        <th style="padding: 8px; border-bottom: 2px solid #ddd;">Price</th>
                        <th style="padding: 8px; border-bottom: 2px solid #ddd;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Subtotal:</td>
                        <td style="padding: 8px; font-weight: bold;">$${subtotal.toFixed(2)}</td>
                    </tr>
                    ${expressFee > 0 ? `
                    <tr>
                        <td colspan="3" style="padding: 8px; text-align: right; color: #2563eb;">Express Fee:</td>
                        <td style="padding: 8px; color: #2563eb;">$${expressFee.toFixed(2)}</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold; font-size: 1.1em;">Total:</td>
                        <td style="padding: 8px; font-weight: bold; font-size: 1.1em;">$${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
              </table>
            </div>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0;">Customer & Delivery</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${data.name}</li>
                <li><strong>Phone:</strong> ${data.phone}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Address:</strong> ${data.address1} ${data.address2 || ''}</li>
                <li><strong>Location:</strong> ${data.city}, ${data.state} ${data.zip}</li>
                <li><strong>Delivery Speed:</strong> ${data.deliverySpeed}</li>
                <li><strong>Recurring:</strong> ${data.isRecurring ? `Yes (${data.recurringFrequency}, ${data.recurringDay})` : 'No'}</li>
                <li><strong>Time Window:</strong> ${data.recurringTime || 'N/A'}</li>
                <li><strong>Notes:</strong> ${data.notes || 'None'}</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 12px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>Note:</strong> ${siteConfig.deliveryTiming.confirmationNote}
                </p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'iLee LLC <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          subject: `${data.deliverySpeed === 'Express' ? '🚀' : '📦'} Order #${orderId} - $${total.toFixed(2)}`,
          html: emailContent,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Order received successfully',
      orderId,
      total
    });
  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
