import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | iLee LLC',
}

export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl prose prose-slate">
            <h1>Privacy Policy</h1>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>
                iLee LLC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting it.
                This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
                We collect information you provide directly to us, such as when you fill out a form, request a quote, or place an order.
                This includes your name, email address, phone number, and delivery address.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>
                We use your information to:
            </p>
            <ul>
                <li>Process and deliver your orders.</li>
                <li>Communicate with you about your delivery status.</li>
                <li>Respond to your inquiries and support requests.</li>
                <li>Improve our services and website.</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>
                We do not sell your personal information. We may share your information with third-party service providers who help us operate our business (e.g., payment processors, email services), but only to the extent necessary to provide these services.
            </p>

            <h2>5. Security</h2>
            <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>

            <h2>6. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at info@ileemoves.com.
            </p>

            <hr className="my-8" />

            <p className="text-sm text-slate-500 italic">
                Disclaimer: iLee LLC is an independent delivery service and is not affiliated with, endorsed by, or sponsored by the water brands we deliver (including Poland Spring, Nestlé Pure Life, Fiji, etc.). All trademarks remain the property of their respective owners.
            </p>
        </div>
    )
}
