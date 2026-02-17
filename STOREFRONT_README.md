# iLee Moves E-Commerce Storefront

Complete modern e-commerce storefront for iLee Moves - bulk water and supplies delivery service.

## Features Implemented

### Shop & Products
- ✅ Full product catalog (8 SKUs matching waterpallets.com pricing)
- ✅ Shop page with filters (category, brand, purchase type, delivery speed)
- ✅ Product detail pages with equipment selector
- ✅ Shopping cart with localStorage persistence
- ✅ Cart drawer slideout

### Checkout & Orders
- ✅ Complete checkout flow
- ✅ Customer information collection
- ✅ Delivery address (NY/NJ/CT only)
- ✅ Recurring order toggle (weekly/bi-weekly/monthly)  
- ✅ Delivery speed selector (Standard included / Express +$75)
- ✅ Order submission API
- ✅ Email/SMS notifications to admin
- ✅ Order confirmation page

### Navigation & UI
- ✅ Header with Shop dropdown menu
- ✅ Cart icon with item count badge
- ✅ Mobile-responsive navigation
- ✅ Footer with legal disclaimer

### Business Rules
- Standard Delivery: **INCLUDED** in all prices ($0)
- Express Delivery: **+$75** at checkout (48hr priority)
- Service Area: Tri-State (NY, NJ, CT)
- Payments: Credit cards, Apple Pay, Square, Zelle
- Independent service (not affiliated with brands)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables** (already configured in `.env.local`):
   ```
   ADMIN_EMAIL=ileellcrealty@gmail.com
   ADMIN_PHONE=718-908-2598
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   ```
   http://localhost:3000
   ```

## Key Pages

- `/` - Homepage
- `/shop` - Product catalog with filters
- `/shop?category=water-beverages` - Filtered by category
- `/shop?delivery=express` - Express delivery products
- `/product/[slug]` - Product detail pages
- `/checkout` - Checkout flow
- `/order-confirmation` - Post-purchase confirmation
- `/reviews` - Customer reviews
- `/admin/orders` - Admin orders dashboard
- `/admin/reviews` - Admin review moderation

## Products

All prices include standard delivery:

1. Niagara Purified 16.9oz - Full Pallet: **$469.99**
2. Poland Spring 16.9oz - Full Pallet: **$499.99**
3. Nestlé Pure Life 16.9oz - Full Pallet: **$449.99**
4. Nestlé Pure Life 16.9oz - Half Pallet: **$229.99**
5. Nestlé Pure Life 16.9oz - 10 Cases: **$99.99**
6. Niagara 16.9oz - 10 Cases: **$89.99**
7. Member's Mark 16.9oz - Half Pallet: **$209.99**
8. Kirkland 16.9oz - Half Pallet: **$209.99**

## Order Flow

1. Customer browses `/shop` and adds products to cart
2. Equipment selection (Forklift, Pallet Jack, Loading Dock)
3. Proceed to `/checkout`
4. Enter customer info + delivery address
5. Optional: Enable recurring delivery
6. **Select delivery speed**:
   - Standard (Included) - 3-5 business days
   - Express (+$75) - Within 48 hours, prioritized
7. Submit order
8. Order sent to admin email + SMS
9. Customer sees confirmation page
10. Admin confirms availability and sends invoice

## Admin Notifications

When an order is placed:
- **Email** sent to: `ileellcrealty@gmail.com`
- **SMS** sent to: `(718) 908-2598`

## Production Deployment

Ready to deploy to Vercel:

```bash
vercel --prod
```

Make sure to set environment variables in Vercel dashboard.

## Next Steps (Optional Enhancements)

- Integrate real email service (Resend, SendGrid)
- Integrate SMS service (Twilio)
- Add database for orders (Supabase, MongoDB)
- Payment processing (Stripe, Square)
- Order tracking system
- Customer accounts

## Legal

Footer includes required disclaimer:
> "iLee Moves is an independent bulk sourcing and delivery service and is not affiliated with the brands listed."

---

**Built with**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
