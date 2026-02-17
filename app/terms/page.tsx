import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | iLee LLC',
}

export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl prose prose-slate">
            <h1>Terms of Service</h1>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing or using our website and services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, simply do not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
                iLee LLC provides third-party logistics and delivery services. We source products on your behalf and deliver them to your specified location.
            </p>

            <h2>3. Orders and Payments</h2>
            <p>
                All orders are subject to acceptance and availability. Prices are subject to change without notice.
                We reserve the right to refuse service to anyone for any reason at any time.
            </p>

            <h2>4. Delivery</h2>
            <p>
                We strive to deliver within the requested time windows, but delays may occur due to traffic, weather, or other unforeseen circumstances.
                We are not liable for any delays.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
                In no event shall iLee LLC be liable for any indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the services.
            </p>

            <h2>6. Disclaimer of Affiliation</h2>
            <p className="font-bold">
                We are an independent delivery service and are not affiliated with the brands listed on our site.
                Reference to any products, services, processes or other information by trade name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof by us, nor does it imply their endorsement of us.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
                We reserve the right to modify these terms at any time. Your continued use of the site following the posting of changes will mean that you accept and agree to the changes.
            </p>
        </div>
    )
}
