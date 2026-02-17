import { NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ileellcrealty@gmail.com"
const ADMIN_PHONE = process.env.ADMIN_PHONE || "718-908-2598"

export async function POST(request: NextRequest) {
    try {
        const orderData = await request.json()

        // Generate order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // In production, you would:
        // 1. Save to database
        // 2. Send email via SendGrid/Resend/etc.
        // 3. Send SMS via Twilio/etc.

        // For now, log the order
        console.log("New Order Received:", {
            orderId,
            ...orderData,
            timestamp: new Date().toISOString(),
        })

        // Email content (would be sent via email service in production)
        const emailContent = `
        NEW ORDER RECEIVED - ${orderId}
        
        Customer: ${orderData.customer.name}
        Phone: ${orderData.customer.phone}
        Email: ${orderData.customer.email}
        
        Delivery Address:
        ${orderData.customer.address.street}
        ${orderData.customer.address.city}, ${orderData.customer.address.state} ${orderData.customer.address.zip}
        
        Delivery Speed: ${orderData.deliverySpeed}${orderData.deliverySpeed === "Express" ? " (+$75)" : " (Included)"}
        
        Items:
        ${
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            orderData.items.map((item: any) =>
                `- ${item.productName} x ${item.quantity} @ $${item.price} = $${(item.price * item.quantity).toFixed(2)}
             Equipment: ${item.equipment && item.equipment.length > 0 ? item.equipment.join(", ") : "None specified"}`
            ).join("\n")}
        
        Subtotal: $${orderData.subtotal.toFixed(2)}
        ${orderData.deliverySpeed === "Express" ? `Express Fee: +$${orderData.expressFee.toFixed(2)}` : "Delivery: Included"}
        TOTAL: $${orderData.total.toFixed(2)}
        
        ${orderData.recurring ? `RECURRING ORDER: ${orderData.recurring.frequency} (Start: ${orderData.recurring.startDate || "ASAP"})` : "One-time order"}
        
        Payment Method: ${orderData.paymentMethod?.toUpperCase() || "INVOICE"}
        Status: ${orderData.status || "New"}
        
        Notes/Instructions:
        ${orderData.customer.instructions || "None"}
        
        ---
        Admin Email: ${ADMIN_EMAIL}
        Admin Phone: ${ADMIN_PHONE}
        
        Next Steps: Confirm availability and send invoice/payment instructions to customer.
        `

        // In production, send email here
        console.log("[EMAIL TO ADMIN]:\n", emailContent)

        // SMS content (would be sent via Twilio in production)
        const smsContent = `iLee Moves: New ${orderData.deliverySpeed} order #${orderId} - ${orderData.customer.name} - $${orderData.total.toFixed(2)}. Check email for details.`
        console.log("[SMS TO ADMIN]:", smsContent)

        return NextResponse.json({
            success: true,
            orderId,
            message: "Order received successfully",
        })
    } catch (error) {
        console.error("Order creation error:", error)
        return NextResponse.json(
            { success: false, message: "Failed to process order" },
            { status: 500 }
        )
    }
}
